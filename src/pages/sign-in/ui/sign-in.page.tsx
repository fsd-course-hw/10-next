// Sign in page component

import { SignInForm } from "@/features/auth";
import { useI18n } from "../i18n";
import clsx from "clsx";

export function SignInPage() {
  const { t } = useI18n();
  return (
    <main className="grow flex flex-col pt-24 ">
      <div
        className={clsx(
          "rounded-xl border border-slate-300 px-14 py-8 pb-14 w-full max-w-[400px] bg-white self-center shadow-lg",
          "dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-700/30",
        )}
      >
        <h1 className="text-2xl mb-6">{t("title")}</h1>
        <SignInForm />
      </div>
    </main>
  );
}
