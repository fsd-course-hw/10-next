import { AvatarsList } from "@/entities/user";
import { useBoardEditors } from "../model/use-board-editors";
import { BoardAccessInfo } from "../model/types";

export function BoardEditors({
  board,
  className,
}: {
  board: BoardAccessInfo;
  className?: string;
}) {
  const { editorsWithOwner } = useBoardEditors(board);

  if (!editorsWithOwner) {
    return null;
  }

  return (
    <AvatarsList
      className={className}
      avatarsIds={editorsWithOwner.map((e) => e.avatarId)}
    />
  );
}
