import { UiHeader } from "@/shared/ui/ui-header";
import { NavLinks } from "./nav-links";
import { Profile } from "./profile";
import { UpdateLang } from "@/features/i18n";
import { UpdateTheme } from "@/features/theme";
import { SignOutButton } from "@/features/auth/pub/sign-out-button";

export function PrivateLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <UiHeader
        links={<NavLinks />}
        right={
          <div className="flex gap-4 items-center ml-auto">
            <Profile />
            <SignOutButton />
            <UpdateLang />
            <UpdateTheme />
          </div>
        }
      />
      <main className="grow flex flex-col">{children}</main>
    </div>
  );
}
