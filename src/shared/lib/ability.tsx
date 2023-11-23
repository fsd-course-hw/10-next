import { AbilityTuple, MongoAbility } from "@casl/ability";
import { useMemo } from "react";

export type Ablity<T extends AbilityTuple> = MongoAbility<T>;

export function createModuleAblility<T extends AbilityTuple, D>({
  useData,
  ablityFactory,
}: {
  useData: () => D;
  ablityFactory: (data: D) => Ablity<T>;
}) {
  return function useAblity() {
    const data = useData();
    const ability = useMemo(() => ablityFactory(data), [data]);
    return ability;
  };
}
