import { useRemoveUser } from "../model/use-remove-user";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function RemoveUserButton({
  className,
  userId,
}: {
  className?: string;
  userId: string;
}) {
  const { remove, isLoading } = useRemoveUser();

  return (
    <button
      onClick={() => remove(userId)}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <UiSpinner className="w-8 h-8 text-rose-500" />
      ) : (
        <RemoveIcon className="w-8 h-8 text-rose-500" />
      )}
    </button>
  );
}
