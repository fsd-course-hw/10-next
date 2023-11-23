import { BoardCard, BoardCol } from "@/entities/board";
import { UserPreview, useUsers } from "@/entities/user";
import { DotsSixVertical, RemoveIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "../../model/use-board-store";
import { useBoardSearch } from "../../model/board-search.store";

export function BoardCards({
  col,
  className,
}: {
  col: BoardCol;
  className?: string;
}) {
  const query = useBoardSearch((s) => s.query);

  return (
    <Droppable direction="vertical" droppableId={col.id} type="card">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={clsx(
            snapshot.isDraggingOver && "bg-blue-100/50",
            "p-1",
            className,
          )}
        >
          {col.items
            .filter((item) =>
              item.name.toLowerCase().includes(query.toLowerCase()),
            )
            .map((item, index) => (
              <BoardCardComponent
                key={item.id}
                card={item}
                index={index}
                colId={col.id}
              />
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function BoardCardComponent({
  card,
  index,
  colId,
}: {
  card: BoardCard;
  index: number;
  colId: string;
}) {
  const assignee = useUsers((s) =>
    card.assigneeId ? s.usersMap()[card.assigneeId] : null,
  );

  const updateCard = useBoardStore().useSelector((s) => s.updateBoardCard);
  const removeCard = useBoardStore().useSelector((s) => s.removeBoardCard);

  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <div ref={innerRef} {...draggableProps} className="py-1 relative">
          <div className="p-2 rounded shadow bg-white ">
            <div className="flex items-center gap-2 [&_.action]:hover:opacity-100">
              <div
                className="p-1 hover:bg-teal-100 rounded cursor-[grab] relative z-10"
                {...dragHandleProps}
              >
                <DotsSixVertical />
              </div>
              <button
                onClick={() => updateCard(colId, card)}
                className="hover:underline p-1 text-lg grow text-start leading-tight"
              >
                {card.name}
              </button>
              <button
                className="text-rose-600 p-1 rounded-full hover:bg-rose-100 transition-all opacity-0 action"
                onClick={() => removeCard(colId, card.id)}
              >
                <RemoveIcon className="w-4 h-4" />
              </button>
            </div>
            {assignee && (
              <UserPreview className="mt-3" size="sm" {...assignee} />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
