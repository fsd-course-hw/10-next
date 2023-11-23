import { create } from "zustand";
import { Session } from "./types";
import { createStoreContext } from "@/shared/lib/zustand";

type SessionStore = {
  currentSession?: Session;
  setCurrentSession: (session: Session) => void;
  removeSession: () => void;
};

export const { useStore: useSession, Provider: SessionProvider } =
  createStoreContext(({ session }: { session?: Session }) =>
    create<SessionStore>((set) => ({
      isLoading: false,
      currentSession: session,
      setCurrentSession: (session) => {
        set({ currentSession: session });
      },
      removeSession: () => {
        set({ currentSession: undefined });
      },
    })),
  );
