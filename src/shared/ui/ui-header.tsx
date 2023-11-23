import clsx from "clsx";
import { UiLogo } from "./ui-logo";
import { ReactNode } from "react";

export function UiHeader({
  className,
  right,
  links,
}: {
  className?: string;
  links?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header
      className={clsx(
        "px-4 py-5 border-b border-b-slate-300 flex justify-between items-center bg-white ",
        "dark:border-b-slate-700 dark:bg-slate-800",
        "grid grid-cols-[1fr_auto_1fr] gap-2",
        className,
      )}
    >
      <UiLogo />
      {links}
      {right}
    </header>
  );
}
