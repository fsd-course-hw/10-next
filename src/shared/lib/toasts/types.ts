export type ToastType = "success" | "error";

export type ToastsConfig = {
  lifeTime: number;
};

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
  timeout: number;
  onRemove: () => void;
};

export type ToastParams = {
  type: ToastType;
  message: string;
  lifeTime?: number;
  onRemove?: () => void;
};

export type ToastsContext = {
  addToast: (params: ToastParams) => void;
};
