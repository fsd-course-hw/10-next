import { CreateBoardData, useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";

export function useCreateBoard() {
  const createBoardRaw = useBoards((s) => s.createBoard);
  const ownerId = useSession((s) => s.currentSession?.userId);

  const createBoard = async (data: CreateBoardData, onCreate: () => void) => {
    if (!ownerId) return;

    await createBoardRaw({ ...data, ownerId: ownerId });

    onCreate();
  };

  return { createBoard };
}
