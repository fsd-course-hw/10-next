import clsx from "clsx";
import { Toast } from "./types";

export function ToastsContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-0 right-0 flex flex-col gap-2 p-4 z-20">
      {toasts.map((t) => (
        <button
          type="button"
          onClick={() => t.onRemove()}
          key={t.id}
          className={clsx(
            "text-white p-4 rounded",
            t.type === "error" ? "bg-red-500 " : "bg-green-500 ",
          )}
        >
          {t.message}
        </button>
      ))}
    </div>
  );
}
