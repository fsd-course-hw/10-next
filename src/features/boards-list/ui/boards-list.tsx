import { useBoards } from "@/entities/board";
import { AvatarsList, UserPreview, useUsers } from "@/entities/user";
import { ROUTER_PATHS } from "@/shared/constants";
import { UpdateBoardButton } from "./update-board-button";
import { RemoveBoardButton } from "./remove-board-button";
import { useBoardsListAbility } from "../model/use-boards-list-ability";
import { subject } from "@casl/ability";
import Link from "next/link";

const boardUrl = (boardId: string) =>
  ROUTER_PATHS.BOARD.replace(":boardId", boardId);

export function BoardsList({ className }: { className?: string }) {
  const boardsListAblity = useBoardsListAbility();
  const { boards } = useBoards();
  const users = useUsers((s) => s.usersMap());

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Название:</th>
            <th className="text-start">Админ:</th>
            <th className="text-start">Редакторы:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.id} className="px-5 py-2 border-b border-b-slate-3 ">
              <td className="p-2">
                <Link
                  href={boardUrl(board.id)}
                  className="text-xl text-blue-500"
                >
                  {board.name}
                </Link>
              </td>
              <td className="p-2">
                <UserPreview size="md" {...users[board.ownerId]} />
              </td>
              <td className="p-2">
                <AvatarsList
                  avatarsIds={board.editorsIds.map((id) => users[id].avatarId)}
                />
              </td>
              <td className="p-2">
                <div className="flex gap-2 ml-auto">
                  {boardsListAblity.can("update", subject("Board", board)) && (
                    <UpdateBoardButton board={board} />
                  )}
                  {boardsListAblity.can("delete", subject("Board", board)) && (
                    <RemoveBoardButton board={board} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
