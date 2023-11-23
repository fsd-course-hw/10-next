import { create } from "zustand";

export type Lang = "ru" | "en";

type LangStore = {
  isLoading: boolean;
  lang: Lang;
  loadLang: () => void;
  setLang: (lang: Lang) => void;
};

export const useLang = create<LangStore>((set, get) => ({
  isLoading: true,
  lang: "ru",
  loadLang: async () => {
    const lang = (localStorage.getItem("lang") as Lang) ?? get().lang;
    set({ lang, isLoading: false });
  },
  setLang: (lang) => {
    localStorage.setItem("lang", lang);

    set({ lang });
  },
}));
