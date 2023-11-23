import { Task, UpdateTaskData, useTasks } from "@/entities/task";
import {
  useFormContext,
  FormProvider,
  useForm,
  Controller,
} from "react-hook-form";
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UserSelect } from "@/entities/user";
import { useStrictContext } from "@/shared/lib/react";
import { updateTaskModalDeps } from "../deps";

export function UpdateTaskForm({
  children,
  onSuccess,
  taskId,
}: {
  children?: React.ReactNode;
  onSuccess: (task: Task) => void;
  taskId: string;
}) {
  const task = useTasks((s) => s.getTaskById(taskId));
  const updateTask = useTasks((s) => s.updateTask);

  const form = useForm<UpdateTaskData>({
    defaultValues: task,
  });

  const handleSumit = form.handleSubmit(async (data) => {
    const newTask = await updateTask(taskId, data);
    onSuccess(newTask);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSumit}>{children}</form>;
    </FormProvider>
  );
}

UpdateTaskForm.Fields = function Fields() {
  const { control } = useFormContext<UpdateTaskData>();
  const { canAssigneUserToTask } = useStrictContext(updateTaskModalDeps);

  return (
    <>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Название задачи - обязательное поле" }}
        render={({ field, fieldState }) => (
          <UiTextField
            label="Название"
            inputProps={{ ...field }}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <UiTextField
            multiline
            label="Описание"
            textAreaProps={{ ...field, rows: 4 }}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="assigneeId"
        render={({ field: { value, onChange }, fieldState }) => (
          <UserSelect
            label="Исполнитель"
            userId={value}
            onChangeUserId={onChange}
            error={fieldState.error?.message}
            className="w-full"
            filterOptions={canAssigneUserToTask}
          />
        )}
      />
    </>
  );
};

UpdateTaskForm.SubmitButton = function SubmitButton() {
  return (
    <UiButton type="submit" variant="primary">
      Обновить
    </UiButton>
  );
};
