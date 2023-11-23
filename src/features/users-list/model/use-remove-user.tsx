import { useUsers } from "@/entities/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useToasts } from "@/shared/lib/toasts";
import { useState } from "react";

export function useRemoveUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();
  const getConfirmation = useGetConfirmation();
  const removeUser = useUsers((s) => s.removeUser);

  const remove = async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    setIsLoading(true);

    try {
      await removeUser(userId);
      addToast({
        message: "Пользователь удален",
        type: "success",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    remove,
  };
}
