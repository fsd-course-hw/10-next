import { UiButton } from "@/shared/ui/ui-button";
import { useSignOut } from "../model/use-sign-out";
import { useI18n } from "../i18n";

export function SignOutButton({ className }: { className?: string }) {
  const { t } = useI18n();
  const { signOut, isLoading } = useSignOut();
  return (
    <UiButton
      isLoading={isLoading}
      className={className}
      variant="outlined"
      onClick={() => signOut()}
    >
      {t("sign-out")}
    </UiButton>
  );
}
