import { createI18nModule } from "@/shared/lib/i18n";

export const useI18n = createI18nModule({
  "sign-in": {
    en: "Sign in",
    ru: "Вход",
  },
  "sign-out": {
    en: "Sign out",
    ru: "Выход",
  },
  "sign-in-success": {
    en: "Sign in success",
    ru: "Вы вошли",
  },
  "sign-in-error": {
    en: "Wrong username or password",
    ru: "Неверное имя пользователя или пароль",
  },
  "password-label": {
    en: "Password",
    ru: "Пароль",
  },
} as const);
