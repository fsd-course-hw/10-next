import { createStrictContext, useStrictContext } from "@/shared/lib/react";

import { useCallback, useEffect, useState } from "react";
import { Board } from "@/entities/board";
import { StoreApi, UseBoundStore } from "zustand";
import { BoardStore, createBoardStore } from "./board.store";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { boardDepsContext } from "../deps";
import { api } from "@/shared/api";
import { useEmitBoardEvents } from "./events/use-emit-board-events";

export const boardStoreContext =
  createStrictContext<UseBoundStore<StoreApi<BoardStore>>>();

export function BoardStoreProvider({
  children,
  board,
}: {
  children?: React.ReactNode;
  board: Board;
}) {
  const getConfirmation = useGetConfirmation();
  const deps = useStrictContext(boardDepsContext);
  const boardEvents = useEmitBoardEvents(board.id);

  const [boardStore] = useState(() => {
    return createBoardStore({
      board,
      getConfirmation,
      itemStore: deps,
      onBoardSaved: () => {
        boardEvents.boardUpdated();
      },
    });
  });

  return (
    <boardStoreContext.Provider value={boardStore}>
      {children}
    </boardStoreContext.Provider>
  );
}

export const useBoardStore = () => {
  const useSelector = useStrictContext(boardStoreContext);
  return { useSelector };
};

export const useFetchBoard = (boardId?: string) => {
  const [board, setBoard] = useState<Board>();

  const fetchBoard = useCallback(() => {
    if (!boardId) {
      return;
    }
    api.getBoardById(boardId).then((board) => {
      if (!board) {
        return;
      }
      setBoard(board);
    });
  }, [boardId]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  return { board, fetchBoard };
};
