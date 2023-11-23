import { useUsers } from "@/entities/user";
import { BoardAccessInfo } from "./types";

export function useBoardEditors(board: BoardAccessInfo) {
  const usersMap = useUsers((s) => s.usersMap());

  const editors = board.editorsIds?.map((id) => usersMap[id]);
  const editorsWithOwner = board
    ? Array.from(new Set([board.ownerId, ...(board?.editorsIds ?? [])])).map(
        (id) => usersMap[id],
      )
    : undefined;

  const owner = board?.ownerId ? usersMap[board?.ownerId] : undefined;

  return { editors, editorsWithOwner, owner };
}
