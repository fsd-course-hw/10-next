import { useSession } from "@/entities/session";
import { Ablity, createModuleAblility } from "@/shared/lib/ability";
import { defineAbility } from "@casl/ability";

type Abilities = [
  "update" | "delete",
  "Board" | { ownerId: string; editorsIds: string[] },
];

export const useBoardsListAbility = createModuleAblility({
  useData: () => useSession((s) => s.currentSession),
  ablityFactory: (session) =>
    defineAbility<Ablity<Abilities>>((can) => {
      if (!session) {
        return;
      }
      const userId = session.userId;

      can("delete", "Board", {
        ownerId: userId,
      });

      can("update", "Board", {
        ownerId: userId,
      });
    }),
});
