import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UserMultiSelect, UserSelect } from "@/entities/user";
import { BoardAccessInfo } from "../model/types";
import {
  UpdateBoardAccessData,
  useUpdateBoardAccess,
} from "../model/use-update-board-access";

export function UpdateBoardAccessModal({
  onClose,
  board,
  onUpdate,
}: {
  onClose: () => void;
  onUpdate: () => void;
  board: BoardAccessInfo;
}) {
  const { control, handleSubmit } = useForm<UpdateBoardAccessData>({
    defaultValues: board,
  });

  const updateBoardAccess = useUpdateBoardAccess(board.id);

  const onSubmit = handleSubmit((data) => updateBoardAccess(data, onUpdate));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Управление доступом</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="ownerId"
            rules={{
              required: "Администратор доски - обязательное поле",
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <UserSelect
                label="Администратор"
                userId={value}
                onChangeUserId={onChange}
                error={fieldState.error?.message}
                required
                className="w-full"
              />
            )}
          />
          <Controller
            control={control}
            name="editorsIds"
            render={({ field: { value, onChange }, fieldState }) => (
              <UserMultiSelect
                label="Выберете редакторов"
                userIds={value ?? []}
                onChangeUserIds={onChange}
                error={fieldState.error?.message}
                className="w-full"
              />
            )}
          />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            Отмена
          </UiButton>
          <UiButton type="submit" variant="primary">
            Обновить
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
