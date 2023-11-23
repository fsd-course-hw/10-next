import { create } from "zustand";

export type Theme = "light" | "dark";

type ThemeStore = {
  isLoading: boolean;
  theme: Theme;
  loadTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<ThemeStore>((set, get) => ({
  isLoading: true,
  theme: "light",
  loadTheme: async () => {
    const theme = (localStorage.getItem("theme") as Theme) ?? get().theme;
    set({ theme, isLoading: false });
  },
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
