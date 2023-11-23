import { confirmationContext, ConfirmationParams  } from "@/shared/lib/confirmation";
import { useState } from "react";
import { ConfirmationModal } from "./confirmation-modal";
import { ConfirmModalParams } from "../model/types";
import { defaultConfirmationParams } from "../constants";

export function Confirmations({ children }: { children?: React.ReactNode }) {
  const [modalParams, setModalParams] = useState<ConfirmModalParams>();

  const closeConfirmation = () => {
    modalParams?.onClose();
  };

  const getConfirmation = (params: ConfirmationParams) => {
    return new Promise<boolean>((res) => {
      setModalParams({
        ...defaultConfirmationParams,
        ...params,
        onConfirm: () => {
          setModalParams(undefined);
          res(true);
        },
        onClose: () => {
          closeConfirmation();
          setModalParams(undefined);
          res(false);
        },
      });
    });
  };

  return (
    <confirmationContext.Provider
      value={{
        getConfirmation,
        closeConfirmation,
      }}
    >
      {children}

      {modalParams && <ConfirmationModal params={modalParams} />}
    </confirmationContext.Provider>
  );
}
