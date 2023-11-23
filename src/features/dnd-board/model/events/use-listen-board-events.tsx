import { useSocket, useSocketHandler } from "@/shared/lib/socket";
import { useBoardStore } from "../use-board-store";
import { useEffect } from "react";

export function useListenBoardEvents() {
  const socket = useSocket();
  const boardStore = useBoardStore();
  const boardId = boardStore.useSelector((s) => s.board.id);
  const reloadBoard = boardStore.useSelector((a) => a.reloadBoard);

  useSocketHandler("refresh-board", () => {
    reloadBoard();
  });

  useEffect(() => {
    socket.emit("join-board", { boardId });
    return () => {
      socket.emit("leave-board", { boardId });
    };
  }, [boardId, socket]);
}
