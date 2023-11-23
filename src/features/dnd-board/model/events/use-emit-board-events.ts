import { useSocket } from "@/shared/lib/socket";

export function useEmitBoardEvents(boardId: string) {
  const socket = useSocket();

  return {
    boardUpdated: () => {
      socket.emit("board-updated", { boardId });
    },
  };
}
