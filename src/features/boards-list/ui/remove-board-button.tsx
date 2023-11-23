import { BoardPartial } from "@/entities/board";
import { useRemoveBoard } from "../model/use-remove-board";
import { RemoveIcon } from "@/shared/ui/ui-icons";

export function RemoveBoardButton({ board }: { board: BoardPartial }) {
  const removeBoard = useRemoveBoard();

  return (
    <button onClick={() => removeBoard(board)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
