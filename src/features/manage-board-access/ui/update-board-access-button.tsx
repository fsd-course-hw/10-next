import { UpdateIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { useState } from "react";
import { UpdateBoardAccessModal } from "./update-board-access-modal";
import { BoardAccessInfo } from "../model/types";

export function UpdateBoardAccessButton({
  className,
  board,
  onUpdate,
}: {
  className?: string;
  board: BoardAccessInfo;
  onUpdate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && board && (
        <UpdateBoardAccessModal
          board={board}
          onClose={() => setOpen(false)}
          onUpdate={() => {
            setOpen(false);
            onUpdate();
          }}
        />
      )}
    </>
  );
}
