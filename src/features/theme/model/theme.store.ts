import { api } from "@/shared/api";
import { createStoreContext } from "@/shared/lib/zustand";
import { create } from "zustand";

export type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const { useStore: useTheme, Provider: ThemeProvider } =
  createStoreContext(({ theme }: { theme?: Theme }) =>
    create<ThemeStore>((set) => ({
      theme: theme ?? "light",
      setTheme: (theme) => {
        set({ theme });
        api.setTheme({ theme }).catch();
      },
    })),
  );
