import { useSession } from "@/entities/session";
import { api } from "@/shared/api";
import { useState } from "react";

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const removeSession = useSession((s) => s.removeSession);

  const signOut = async () => {
    setIsLoading(true);
    await api.signOut().finally(() => {
      setIsLoading(false);
    });

    return removeSession();
  };

  return {
    signOut,
    isLoading,
  };
}
