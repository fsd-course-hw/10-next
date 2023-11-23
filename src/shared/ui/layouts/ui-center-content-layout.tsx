import clsx from "clsx";
import { ReactNode } from "react";

export function UiCetnerContentLayout({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "container mx-auto max-w-[1000px] m-full px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
