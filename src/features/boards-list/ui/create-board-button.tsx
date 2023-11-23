import { UiButton } from "@/shared/ui/ui-button";
import clsx from "clsx";
import { useState } from "react";
import { CreateBoardModal } from "./create-board-modal";

export function CreateBoardButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UiButton
        variant="primary"
        className={clsx(className)}
        onClick={() => setOpen(true)}
      >
        Новая доска
      </UiButton>
      {open && <CreateBoardModal onClose={() => setOpen(false)} />}
    </>
  );
}
