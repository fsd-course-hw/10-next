import { BoardPartial, useBoards } from "@/entities/board";
import { UiSelect } from "@/shared/ui/ui-select-field";

export function BoardSelect({
  className,
  label,
  onChangeBoardId,
  boardId,
  required,
  error,
  filterOptions = () => true,
}: {
  error?: string;

  className?: string;
  boardId?: string;
  label?: string;
  onChangeBoardId: (id?: string) => void;
  required?: boolean;
  filterOptions?: (board: BoardPartial) => boolean;
}) {
  const board = useBoards((s) =>
    boardId ? s.getBoardById(boardId) : undefined,
  );
  const boards = useBoards((s) => s.boards.filter(filterOptions));

  const options = required ? boards : [undefined, ...boards];

  const onChangeBoard = (board?: BoardPartial) => {
    onChangeBoardId(board?.id);
  };

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={board}
      onChange={onChangeBoard}
      getLabel={(board) => board?.name ?? ""}
    />
  );
}
