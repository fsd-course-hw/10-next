import { Theme, useTheme } from "../model/theme.store";
import { UiSelect } from "@/shared/ui/ui-select-field";

type ThemeOption = {
  id: Theme;
  label: string;
};

const themeOptions: ThemeOption[] = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
];

export function UpdateTheme({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const themeOption = themeOptions.find((option) => option.id === theme);
  const onChangeTheme = (theme: ThemeOption) => {
    setTheme(theme.id);
  };

  return (
    <UiSelect
      className={className}
      options={themeOptions}
      value={themeOption}
      onChange={onChangeTheme}
      getLabel={(option) => option.label}
    />
  );
}
