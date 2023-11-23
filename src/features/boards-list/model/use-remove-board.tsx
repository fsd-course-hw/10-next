import { useGetConfirmation } from "@/shared/lib/confirmation";
import { BoardPartial, useBoards } from "@/entities/board";

export function useRemoveBoard() {
  const getConfirmation = useGetConfirmation();

  const { removeBoard } = useBoards();

  return async (board: BoardPartial) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить доску?",
    });

    if (!confirmation) return;

    removeBoard(board.id);
  };
}
