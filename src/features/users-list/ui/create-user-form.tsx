import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";

import { UiButton } from "@/shared/ui/ui-button";
import { UiImageSelect } from "@/shared/ui/ui-image-select";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { CreateUserData, getAvatarUrl } from "@/entities/user";
import { useCreateUser } from "../model/use-create-user";
import { RoleSelect } from "./role-select";

export function CreateUserForm({ className }: { className?: string }) {
  const { createUser, isLoading } = useCreateUser();

  const { control, reset, handleSubmit } = useForm<CreateUserData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await createUser?.(data);
        reset();
      })}
      className={clsx(className, "flex flex-col gap-4")}
    >
      <div className="grid gap-2 grid-cols-2">
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email пользователя - обязательное поле" }}
          render={({ field, fieldState }) => (
            <UiTextField
              label="Email"
              inputProps={{ ...field, type: "email" }}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Пароль пользователя - обязательное поле" }}
          render={({ field, fieldState }) => (
            <UiTextField
              label="Пароль"
              inputProps={{ ...field, type: "password" }}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={{ required: "Имя пользователя - обязательное поле" }}
          render={({ field, fieldState }) => (
            <UiTextField
              label="Имя нового пользователя"
              inputProps={{ ...field }}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="role"
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <RoleSelect
              label="Роль пользователя"
              role={field.value}
              onChangeRole={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="avatarId"
        rules={{ required: "Аватар - обязательное поле" }}
        render={({ field: { value, onChange }, fieldState }) => (
          <UiImageSelect
            label="Выберете аватар пользователя"
            value={value}
            onChange={onChange}
            getSrc={getAvatarUrl}
            images={Array.from({ length: 8 }, (_, i) => i + 1)}
            error={fieldState.error?.message}
          />
        )}
      />

      <UiButton variant="primary" type="submit" isLoading={isLoading}>
        Создать
      </UiButton>
    </form>
  );
}
