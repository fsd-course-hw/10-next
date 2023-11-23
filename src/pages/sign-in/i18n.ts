import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  title: {
    en: "Sign in",
    ru: "Вход",
  },
} as const);
