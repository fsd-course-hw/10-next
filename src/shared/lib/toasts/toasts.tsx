import { useState } from "react";
import { ToastsContainer } from "./toasts-container";
import { toastsContext } from "./toasts-context";
import { Toast, ToastsConfig, ToastParams } from "./types";
import { nanoid } from "nanoid";

export function Toasts({
  children,
  config,
}: {
  children?: React.ReactNode;
  config: ToastsConfig;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = ({
    type,
    message,
    lifeTime = config.lifeTime,
    onRemove,
  }: ToastParams) => {
    const removeToast = (id: string) => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    };

    const id = nanoid();

    const newToast: Toast = {
      id,
      type,
      message,
      timeout: setTimeout(() => {
        removeToast(id);
        onRemove?.();
      }, lifeTime) as unknown as number,
      onRemove: () => {
        clearTimeout(newToast.timeout);
        removeToast(id);
        onRemove?.();
      },
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  return (
    <toastsContext.Provider value={{ addToast }}>
      <ToastsContainer toasts={toasts} />

      {children}
    </toastsContext.Provider>
  );
}
