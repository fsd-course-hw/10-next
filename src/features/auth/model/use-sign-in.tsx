import { useSession } from "@/entities/session";
import { api } from "@/shared/api";
import { ROUTER_PATHS } from "@/shared/constants";
import { useState } from "react";
import { useI18n } from "../i18n";
import { useToasts } from "@/shared/lib/toasts";
import { useRouter } from "next/router";

export function useSignIn() {
  const { t } = useI18n();
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const setCurrentSession = useSession((s) => s.setCurrentSession);

  const signIn = (signInDto: api.SignInDto) => {
    setIsLoading(true);
    api
      .signIn(signInDto)
      .then(async (session) => {
        setCurrentSession(await api.getSession());
        addToast({
          message: t("sign-in-success"),
          type: "success",
        });
        return session;
      })
      .then(() => {
        router.push(ROUTER_PATHS.BOARDS);
      })
      .catch(() => {
        setError(t("sign-in-error"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    error,
    signIn,
  };
}
