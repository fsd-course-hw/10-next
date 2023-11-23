import { useSession } from "@/entities/session";
import { Ablity, createModuleAblility } from "@/shared/lib/ability";
import { defineAbility } from "@casl/ability";

type Abilities = [
  "read" | "update-access",
  "Board" | { ownerId: string; editorsIds: string[] },
];

export const useBoardPageAblity = createModuleAblility({
  useData: () => useSession((s) => s.currentSession),
  ablityFactory: (session) =>
    defineAbility<Ablity<Abilities>>((can) => {
      if (!session) {
        return;
      }
      const userId = session.userId;

      can("read", "Board", {
        ownerId: userId,
      });
      can("read", "Board", {
        editorsIds: { $in: [userId] },
      });

      can("update-access", "Board", {
        ownerId: userId,
      });
    }),
});
