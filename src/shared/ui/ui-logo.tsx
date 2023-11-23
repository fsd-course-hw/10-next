import clsx from "clsx";

export function UiLogo({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center gap-2 text-2xl ")}>
      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-teal-500 from-40% to-blue-400">
        Easy Trello
      </span>
    </div>
  );
}
