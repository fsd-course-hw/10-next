import { UiButton } from "@/shared/ui/ui-button";
import clsx from "clsx";
import { AddColumnModal } from "./modals/add-column-modal";
import { useState } from "react";

export function BoardActions({ className }: { className?: string }) {
  const [addColumnModalOpen, setAddColumnModalOpen] = useState(false);

  return (
    <div className={clsx("flex gap-2", className)}>
      <UiButton variant="primary" onClick={() => setAddColumnModalOpen(true)}>
        Добавить колонку
      </UiButton>
      {addColumnModalOpen && (
        <AddColumnModal onClose={() => setAddColumnModalOpen(false)} />
      )}
    </div>
  );
}
