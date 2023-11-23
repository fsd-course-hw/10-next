import { nanoid } from "nanoid";
import { create } from "zustand";
import {
  BoardCol,
  BoardPartial,
  CreateBoardData,
  UpdateBoardData,
} from "./types";
import { api } from "@/shared/api";
import { createStoreContext } from "@/shared/lib/zustand";

export type BoardsStore = {
  boards: BoardPartial[];
  getBoardById: (id: string) => BoardPartial | undefined;
  loadBoards: () => Promise<void>;
  createBoard: (data: CreateBoardData) => Promise<void>;
  updateBoard: (id: string, data: UpdateBoardData) => Promise<void>;
  removeBoard: (id: string) => Promise<void>;
};

export const { useStore: useBoards, Provider: BoardsProvider } =
  createStoreContext(({ boards }: { boards: BoardPartial[] }) =>
    create<BoardsStore>((set, get) => ({
      boards,
      getBoardById: (id) => {
        return get().boards.find((board) => board.id === id);
      },
      loadBoards: async () => {
        set({
          boards: await api.getBoards(),
        });
      },
      createBoard: async (data) => {
        const newBoard = { id: nanoid(), ...data, cols: [] as BoardCol[] };
        await api.createBoard(newBoard);
        set({
          boards: await api.getBoards(),
        });
      },
      updateBoard: async (id, data) => {
        const board = await api.getBoardById(id);
        if (!board) return;
        const newBoard = { ...board, ...data };

        await api.updateBoard(id, newBoard);
        set({
          boards: await api.getBoards(),
        });
      },
      removeBoard: async (boardId: string) => {
        await api.deleteBoard(boardId);
        set({
          boards: await api.getBoards(),
        });
      },
    })),
  );
