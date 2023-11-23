import { UserRole } from "@/shared/api/generated";
import { UiSelect } from "@/shared/ui/ui-select-field";

type Option = {
  id: UserRole;
  label: string;
};
export function RoleSelect({
  className,
  label,
  onChangeRole: onChangeUserId,
  role,
  error,
}: {
  error?: string;
  className?: string;
  role?: UserRole;
  label?: string;
  onChangeRole: (id?: string) => void;
}) {
  const options = [
    { id: "user", label: "Пользователь" },
    { id: "admin", label: "Администратор" },
  ] as Option[];

  const value = role ? options.find((o) => o.id === role) : undefined;

  const onChangeRole = (option: Option) => {
    onChangeUserId(option.id);
  };

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={value}
      getLabel={(option) => option.label}
      onChange={onChangeRole}
    />
  );
}
