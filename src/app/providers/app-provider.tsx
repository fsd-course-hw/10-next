import { useLang } from "@/features/i18n";
import { I18nProvider } from "@/shared/lib/i18n";
import { ComposeChildren } from "@/shared/lib/react";
import { Toasts } from "@/shared/lib/toasts";
import { Confirmations } from "@/widgets/confirmations";

export function AppProvider({ children }: { children?: React.ReactNode }) {
  const { lang } = useLang();
  return (
    <ComposeChildren>
      <I18nProvider lang={lang} />
      <Confirmations />
      <Toasts config={{ lifeTime: 3000 }} />
      {children}
    </ComposeChildren>
  );
}
