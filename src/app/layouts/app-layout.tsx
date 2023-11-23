import { useTheme } from "@/features/theme";
import clsx from "clsx";

export function AppLayout({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <div className={clsx(theme)}>
      <div className="text-slate-900 dark:text-white">{children}</div>
    </div>
  );
}
