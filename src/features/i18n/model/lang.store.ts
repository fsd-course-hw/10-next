import { api } from "@/shared/api";
import { createStoreContext } from "@/shared/lib/zustand";
import { create } from "zustand";

export type Lang = "ru" | "en";

type LangStore = {
  lang: Lang;
  setLang: (lang: Lang) => Promise<void>;
};

export const { useStore: useLang, Provider: LangProvider } = createStoreContext(
  ({ lang }: { lang?: Lang }) =>
    create<LangStore>((set) => ({
      lang: lang ?? "en",
      setLang: async (lang) => {
        set({ lang });
        api.setLang({ lang }).catch();
      },
    })),
);
