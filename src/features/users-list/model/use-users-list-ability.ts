import { useSession } from "@/entities/session";
import { Ablity, createModuleAblility } from "@/shared/lib/ability";
import { defineAbility } from "@casl/ability";

type UsersListAblity = ["read" | "create" | "delete", "User" | { id: string }];

export const useUsersListAblity = createModuleAblility({
  useData: () => useSession((s) => s.currentSession),
  ablityFactory: (session) =>
    defineAbility<Ablity<UsersListAblity>>((can) => {
      if (!session) {
        return;
      }

      can("read", "User");

      if (session.role === "admin") {
        can("create", "User");
        can("delete", "User", {
          id: { $ne: session.userId },
        });
      }
    }),
});
