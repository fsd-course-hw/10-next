import { UiModal } from "@/shared/ui/ui-modal";
import { ConfirmModalParams } from "../model/types";
import { UiButton } from "@/shared/ui/ui-button";

export function ConfirmationModal({ params }: { params: ConfirmModalParams }) {
  return (
    <UiModal isOpen onClose={params.onClose}>
      <UiModal.Header>{params.titile}</UiModal.Header>
      <UiModal.Body>{params.description}</UiModal.Body>
      <UiModal.Footer>
        <UiButton variant="outlined" onClick={params.onClose}>
          {params.closeText}
        </UiButton>
        <UiButton variant="primary" onClick={params.onConfirm}>
          {params.confirmText}
        </UiButton>
      </UiModal.Footer>
    </UiModal>
  );
}
