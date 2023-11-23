import { UserPreview, useUsers } from "@/entities/user";
import { RemoveUserButton } from "./remove-user-button";
import { useUsersListAblity } from "..";

export function UsersList({ className }: { className?: string }) {
  const { users } = useUsers();
  const usersListAbility = useUsersListAblity();

  return (
    <div className={className}>
      {users.map((user) => (
        <div
          key={user.id}
          className="px-5 py-2 border-b border-b-slate-3 flex gap-2 items-center "
        >
          <UserPreview size="md" name={user.name} avatarId={user.avatarId} />
          <div className="ml-auto flex gap-2 shrink-0">
            {usersListAbility.can("delete", "User") && (
              <RemoveUserButton userId={user.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
