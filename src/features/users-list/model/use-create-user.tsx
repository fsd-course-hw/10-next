import { CreateUserData, useUsers } from "@/entities/user";
import { useToasts } from "@/shared/lib/toasts";
import { useState } from "react";

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();
  const createUserRaw = useUsers((s) => s.createUser);

  const createUser = async (data: CreateUserData) => {
    setIsLoading(true);
    await createUserRaw?.(data).finally(() => {
      setIsLoading(false);
    });
    addToast({
      type: "success",
      message: "Пользователь создан",
    });
  };

  return {
    isLoading,
    createUser,
  };
}
