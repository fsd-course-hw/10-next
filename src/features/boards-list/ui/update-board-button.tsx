import { UpdateIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { useState } from "react";
import { UpdateBoardModal } from "./update-board-modal";
import { BoardPartial } from "@/entities/board";

export function UpdateBoardButton({
  className,
  board,
}: {
  className?: string;
  board: BoardPartial;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && (
        <UpdateBoardModal board={board} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
