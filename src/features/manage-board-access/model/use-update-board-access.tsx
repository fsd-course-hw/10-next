import { useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { BoardAccessInfo } from "./types";

export type UpdateBoardAccessData = {
  editorsIds?: string[];
  ownerId: string;
};

export function useUpdateBoardAccess(boardId: string) {
  const getConfirmation = useGetConfirmation();
  const ownerId = useSession((s) => s.currentSession?.userId);
  const updateModalRaw = useBoards((s) => s.updateBoard);

  return async (
    data: UpdateBoardAccessData,
    onUpdate: (boardAccessInfo: BoardAccessInfo) => void,
  ) => {
    if (ownerId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateModalRaw(boardId, data);
    onUpdate({ id: boardId, ...data });
  };
}
