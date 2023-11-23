import { createStrictContext, useStrictContext } from "./react";

export type ConfirmationParams = {
  title?: string;
  description?: string;
  closeText?: string;
  confirmText?: string;
};

export type ConfirmationContext = {
  getConfirmation: (params: ConfirmationParams) => Promise<boolean>;
  closeConfirmation: () => void;
};

export const confirmationContext = createStrictContext<ConfirmationContext>();

export const useGetConfirmation = () => {
  const { getConfirmation } = useStrictContext(confirmationContext);

  return getConfirmation;
};
