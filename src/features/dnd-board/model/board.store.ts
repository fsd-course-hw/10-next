import { Board, BoardCard } from "@/entities/board";
import { api } from "@/shared/api";
import { ConfirmationParams } from "@/shared/lib/confirmation";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { create } from "zustand";

export type BoardStore = {
  board: Board;

  addColumn: (name: string) => Promise<void>;
  updateColumn: (id: string, name: string) => Promise<void>;
  removeColumn: (id: string) => Promise<void>;
  moveColumn: (index: number, newIndex: number) => Promise<void>;

  addBoardCard: (colId: string, name: string) => Promise<void>;
  updateBoardCard: (colId: string, boardCard: BoardCard) => Promise<void>;
  removeBoardCard: (colId: string, boardCardId: string) => Promise<void>;
  moveBoardCard: (
    start: { colId: string; index: number },
    end: { colId: string; index: number },
  ) => Promise<void>;

  saveBoard: (value: Board) => Promise<void>;
  reloadBoard: () => Promise<void>;
};

export type BoardCardStore = {
  createBoardCard: (name: string) => Promise<BoardCard>;
  updateBoardCard: (boardCard: BoardCard) => Promise<BoardCard | undefined>;
  onBeforeRemoveBoardCard: (boardCard: string) => Promise<void>;
};

export const createBoardStore = ({
  board,
  itemStore,
  getConfirmation,
  onBoardSaved,
}: {
  board: Board;
  itemStore: BoardCardStore;
  getConfirmation: (params: ConfirmationParams) => Promise<boolean>;
  onBoardSaved: () => void;
}) => {
  return create<BoardStore>((set, get) => ({
    board,
    addColumn: async (name) => {
      const board = get().board;

      const newBoard = produce<Board>((draft) => {
        draft.cols.push({ id: nanoid(), name: name, items: [] });
      })(board);

      return get().saveBoard(newBoard);
    },

    updateColumn: async (id, name) => {
      const board = get().board;

      const newBoard = produce<Board>((draft) => {
        const index = draft.cols.findIndex((col) => col.id === id);
        draft.cols[index].name = name;
      })(board);

      return get().saveBoard(newBoard);
    },

    removeColumn: async (id) => {
      const board = get().board;

      const confirmation = await getConfirmation({
        title: "Удаление колонки",
        description: "Вы уверены, что хотите удалить эту колонку?",
      });

      if (!confirmation) {
        return;
      }

      const newBoard = produce<Board>((draft) => {
        const index = draft.cols.findIndex((col) => col.id === id);
        draft.cols.splice(index, 1);
      })(board);

      return get().saveBoard(newBoard);
    },

    moveColumn: async (index, newIndex) => {
      const board = get().board;

      const newBoard = produce<Board>((draft) => {
        const col = draft.cols[index];
        draft.cols.splice(index, 1);
        draft.cols.splice(newIndex, 0, col);
      })(board);

      set({
        board: newBoard,
      });

      return get().saveBoard(newBoard);
    },

    // board item methods
    addBoardCard: async (colId, name) => {
      const board = get().board;

      const boardCard = await itemStore.createBoardCard(name);

      const newBoard = produce<Board>((draft) => {
        const index = draft.cols.findIndex((col) => col.id === colId);
        draft.cols[index].items.push(boardCard);
      })(board);

      return get().saveBoard(newBoard);
    },

    updateBoardCard: async (colId, boardCard) => {
      const board = get().board;

      const newBoardCard = await itemStore.updateBoardCard(boardCard);
      if (!newBoardCard) {
        return;
      }

      const newBoard = produce<Board>((draft) => {
        const index = draft.cols.findIndex((col) => col.id === colId);
        const itemIndex = draft.cols[index].items.findIndex(
          (item) => item.id === boardCard.id,
        );
        draft.cols[index].items[itemIndex] = newBoardCard;
      })(board);

      return get().saveBoard(newBoard);
    },

    removeBoardCard: async (colId, boardCardId) => {
      const board = get().board;

      const confirmation = await getConfirmation({
        title: "Удаление карточки",
        description: "Вы уверены, что хотите удалить карточку?",
      });

      if (!confirmation) {
        return;
      }

      await itemStore.onBeforeRemoveBoardCard(boardCardId);

      const newBoard = produce<Board>((draft) => {
        const index = draft.cols.findIndex((col) => col.id === colId);
        const itemIndex = draft.cols[index].items.findIndex(
          (item) => item.id === boardCardId,
        );
        draft.cols[index].items.splice(itemIndex, 1);
      })(board);

      return get().saveBoard(newBoard);
    },

    moveBoardCard: async (start, end) => {
      const board = get().board;

      const startColIndex = board.cols.findIndex(
        (col) => col.id === start.colId,
      );
      const endColIndex = board.cols.findIndex((col) => col.id === end.colId);

      const newBoard = produce<Board>((draft) => {
        const item = draft.cols[startColIndex].items[start.index];
        draft.cols[startColIndex].items.splice(start.index, 1);
        draft.cols[endColIndex].items.splice(end.index, 0, item);
      })(board);

      set({
        board: newBoard,
      });

      return get().saveBoard(newBoard);
    },

    saveBoard: async (value: Board) => {
      await api.updateBoard(value.id, value);
      onBoardSaved();
      set({ board: value });
    },
    reloadBoard: async () => {
      const board = await api.getBoardById(get().board.id);
      set({ board });
    },
  }));
};
