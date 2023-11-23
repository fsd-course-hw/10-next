export type ConfirmModalParams = {
  titile: string;
  description: string;
  closeText: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
};
