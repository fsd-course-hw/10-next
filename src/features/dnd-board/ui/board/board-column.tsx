import clsx from "clsx";
import { BoardCol } from "@/entities/board";
import { DotsSixVertical, RemoveIcon, UpdateIcon } from "@/shared/ui/ui-icons";
import { useState } from "react";
import { UpdateColumnModal } from "../modals/update-column-modal";
import { Draggable } from "react-beautiful-dnd";
import { AddBoardCard } from "../add-board-card";
import { useBoardStore } from "../../model/use-board-store";
import { BoardCards } from "./board-cards";

export function BoardColumn({
  col,
  className,
  index,
}: {
  col: BoardCol;
  className?: string;
  index: number;
}) {
  const [updateColumnModalOpen, setUpdateColumnModalOpen] = useState(false);
  const removeColumn = useBoardStore().useSelector((s) => s.removeColumn);

  return (
    <Draggable draggableId={col.id} index={index} key={col.id}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={clsx(
            "w-[300px] bg-white rounded-lg py-3 px-2 mx-2 flex flex-col",
            className,
          )}
        >
          <div className="flex items-center gap-2 [&_.action]:hover:opacity-100">
            <div
              {...provided.dragHandleProps}
              className="p-1 hover:bg-teal-100 rounded cursor-[grab]"
            >
              <DotsSixVertical />
            </div>
            <div className="text-lg mr-auto">{col.name}</div>
            <button
              className="text-teal-600 p-1 rounded-full hover:bg-teal-100 transition-all opacity-0 action"
              onClick={() => setUpdateColumnModalOpen(true)}
            >
              <UpdateIcon className="w-4 h-4" />
            </button>
            <button
              className="text-rose-600 p-1 rounded-full hover:bg-rose-100 transition-all opacity-0 action"
              onClick={() => removeColumn(col.id)}
            >
              <RemoveIcon className="w-4 h-4" />
            </button>
            {updateColumnModalOpen && (
              <UpdateColumnModal
                columnId={col.id}
                onClose={() => setUpdateColumnModalOpen(false)}
              />
            )}
          </div>
          <div className="mt-2">
            <AddBoardCard colId={col.id} />
          </div>
          <BoardCards col={col} className="grow" />
        </div>
      )}
    </Draggable>
  );
}
