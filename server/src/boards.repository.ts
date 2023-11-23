import { persistStorage } from "./storage";
import {
  BoardDto,
  CreateBoardDto,
  BoardPatchDto,
  BoardColDto,
} from "../generated";
import { nanoid } from "nanoid";

const BOARDS_STORAGE_KEY = "boards_storsage";
export const boardsRepository = {
  getBoards: async (): Promise<BoardDto[]> => {
    return persistStorage.getItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, []);
  },
  getBoard: async (id: string): Promise<BoardDto | undefined> => {
    return persistStorage
      .getItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, [])
      .then((boards) => boards.find((board) => board.id === id));
  },
  createBoard: async (value: CreateBoardDto) => {
    const boards = (await boardsRepository.getBoards()) as BoardDto[];

    const newBoard = {
      ...value,
      cols: [] as BoardColDto[],
      id: nanoid(),
    };

    boards.push(newBoard);

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards);

    return newBoard;
  },
  updateBoard: async (id: string, path: BoardPatchDto) => {
    const boards = (await boardsRepository.getBoards()) as BoardDto[];
    const boardIndex = boards.findIndex((board) => board.id === id);

    if (boardIndex === -1) {
      return;
    } else {
      boards[boardIndex] = { ...boards[boardIndex], ...path };
    }

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards);
  },
  removeBoard: async (boardId: string) => {
    const boards = await boardsRepository.getBoards();
    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      boards.filter((board) => board.id !== boardId),
    );
  },
  // private
  removeAuthorFromBoards: async (userId: string) => {
    for (const board of await boardsRepository.getBoards()) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter((id) => id !== userId),
      };

      if (newBoard.ownerId === userId) {
        await boardsRepository.removeBoard(newBoard.id);
      } else {
        await boardsRepository.updateBoard(board.id, newBoard);
      }
    }
  },
};
