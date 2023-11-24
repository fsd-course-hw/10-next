import { UpdateLang } from "@/features/i18n/";
import { UpdateTheme } from "@/features/theme";
import { UiHeader } from "@/shared/ui/ui-header";

export function OpenLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-800">
      <UiHeader
        links={<div></div>}
        right={
          <div className="flex gap-4 items-center ml-auto">
            <UpdateLang />
            <UpdateTheme />
          </div>
        } // {<UpdateLang className="ml-auto" />}
      />
      <main className="grow flex flex-col">{children}</main>
    </div>
  );
}
