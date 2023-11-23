import { Session, SessionProvider } from "@/entities/session";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";
import { useTheme } from "@/features/theme";
import { useLang } from "@/features/i18n";
import { api } from "@/shared/api";

export const loadAppLoaderData = async () => {
  try {
    const session = await api.getSession();
    return { session };
  } catch {
    return {};
  }
};

export function AppLoader({
  children,
  data,
}: {
  children?: ReactNode;
  data?: Awaited<ReturnType<typeof loadAppLoaderData>>;
}) {
  const [session, setSession] = useState<Session | undefined>(data?.session);
  const isData = !!session;

  const loadTheme = useTheme((s) => s.loadTheme);
  const loadLang = useLang((s) => s.loadLang);

  const [isLoading, setIsLoading] = useState(!isData);

  useApplayAppInterceptor();

  useEffect(() => {
    loadTheme();
    loadLang();

    if (isData) {
      return;
    }
    setIsLoading(true);

    api
      .getSession()
      .then(setSession)
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => {});
  }, [loadTheme, loadLang, isData]);

  return (
    <>
      <UiPageSpinner isLoading={isLoading} />
      {!isLoading ? (
        <SessionProvider
          value={{
            session,
          }}
        >
          {children}
        </SessionProvider>
      ) : null}
    </>
  );
}
