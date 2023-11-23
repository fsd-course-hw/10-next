import { BoardAccessInfo } from "./types";

export function useCanUserAccessBoard() {
  return (userId: string, board: BoardAccessInfo) => {
    if (board.ownerId === userId) {
      return true;
    }

    if (board.editorsIds?.includes(userId)) {
      return true;
    }

    return false;
  };
}
