import { SessionProvider } from "@/entities/session";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";
import { api } from "@/shared/api";
import { ComposeChildren } from "@/shared/lib/react";
import { LangProvider } from "@/features/i18n";
import { ThemeProvider } from "@/features/theme";

export const loadAppLoaderData = async (
  { isPublicRoute } = { isPublicRoute: false },
) => {
  try {
    const session = isPublicRoute ? null : await api.getSession();
    const lang = await api.getLang();
    const theme = await api.getTheme();
    return { session, lang, theme };
  } catch {
    return {};
  }
};

export function AppLoader({
  children,
  data: defaultData,
}: {
  children?: ReactNode;
  data?: Awaited<ReturnType<typeof loadAppLoaderData>>;
}) {
  const [data, setData] = useState(defaultData);

  const session = data?.session;
  const lang = data?.lang;
  const theme = data?.theme;

  const isData = !!lang && !!theme && session !== undefined;

  const [isLoading, setIsLoading] = useState(!isData);

  useApplayAppInterceptor();

  useEffect(() => {
    if (isData) {
      return;
    }
    setIsLoading(true);

    loadAppLoaderData()
      .then(setData)
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => {});
  }, [isData]);

  return (
    <>
      <UiPageSpinner isLoading={isLoading} />
      {!isLoading ? (
        <ComposeChildren>
          <SessionProvider
            value={{
              session: session ?? undefined,
            }}
          />
          <LangProvider value={{ lang: lang?.lang }} />
          <ThemeProvider value={{ theme: theme?.theme }} />
          {children}
        </ComposeChildren>
      ) : null}
    </>
  );
}
