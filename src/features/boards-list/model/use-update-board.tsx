import { BoardPartial, UpdateBoardData, useBoards } from "@/entities/board";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useSession } from "@/entities/session";

export function useUpdateBoard(board?: BoardPartial) {
  const getConfirmation = useGetConfirmation();

  const ownerId = useSession((s) => s.currentSession?.userId);

  const updateModalRaw = useBoards((s) => s.updateBoard);

  const updateBoard = async (data: UpdateBoardData, onUpdate: () => void) => {
    if (!board) return;

    if (ownerId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateModalRaw(board.id, data);
    onUpdate();
  };

  return { updateBoard };
}
