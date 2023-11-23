import { ConfirmModalParams } from "./model/types";

export const defaultConfirmationParams: ConfirmModalParams = {
  titile: "Подтвердите действие",
  description: "Вы уверены что хотите продолжить?",
  closeText: "Отмена",
  confirmText: "Подтвердить",
  onClose: () => {},
  onConfirm: () => {},
};
