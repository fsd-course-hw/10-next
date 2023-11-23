import { User, UserPreview, useUsers } from "@/entities/user";
import { UiSelect } from "@/shared/ui/ui-select-field";

export function UserSelect({
  className,
  label,
  onChangeUserId,
  userId,
  required,
  error,
  filterOptions = () => true,
}: {
  error?: string;

  className?: string;
  userId?: string;
  label?: string;
  onChangeUserId: (id?: string) => void;
  required?: boolean;
  filterOptions?: (option: User) => boolean;
}) {
  const user = useUsers((s) => (userId ? s.getUserById(userId) : undefined));
  const users = useUsers((s) => s.users.filter(filterOptions));

  const options = required ? users : [undefined, ...users];

  const onChangeUser = (user?: User) => {
    onChangeUserId(user?.id);
  };

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={user}
      onChange={onChangeUser}
      getLabel={(user) => user?.name ?? ""}
      renderPreview={(user) =>
        user ? (
          <UserPreview size="sm" className="shrink-0 px-1" {...user} />
        ) : (
          <div>Не выбрано</div>
        )
      }
      renderOption={(user) =>
        user ? <UserPreview size="sm" {...user} /> : <div>Не выбрано</div>
      }
    />
  );
}
