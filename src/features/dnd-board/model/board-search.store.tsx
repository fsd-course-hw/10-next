import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useState } from "react";
import { StoreApi, UseBoundStore, create } from "zustand";

type BoardSearch = {
  query: string;
  setQuery: (query: string) => void;
};

export const createBoardSearch = () =>
  create<BoardSearch>((set) => ({
    query: "",
    setQuery: (query) => set({ query }),
  }));

const searchBoardContext =
  createStrictContext<UseBoundStore<StoreApi<BoardSearch>>>();

export function BoardSearchProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [boardSearchStore] = useState(() => createBoardSearch());
  return (
    <searchBoardContext.Provider value={boardSearchStore}>
      {children}
    </searchBoardContext.Provider>
  );
}

export const useBoardSearch = <T,>(selector: (value: BoardSearch) => T) => {
  const useSelector = useStrictContext(searchBoardContext);
  return useSelector(selector);
};
