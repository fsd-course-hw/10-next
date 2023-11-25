import { StoreApi, UseBoundStore } from "zustand";
import { createStrictContext, useStrictContext } from "./react";
import { useState } from "react";

export const createStoreContext = <S, P = void>(
  factory: (value: P) => UseBoundStore<StoreApi<S>>,
) => {
  const context = createStrictContext<UseBoundStore<StoreApi<S>>>();

  const Provider = ({
    children,
    value,
  }: {
    children?: React.ReactNode;
    value: P;
  }) => {
    const [store] = useState(() => factory(value));

    return <context.Provider value={store}>{children}</context.Provider>;
  };

  const useStore = <R = S,>(selector?: (store: S) => R) => {
    return useStrictContext(context)(selector ?? ((s) => s as unknown as R));
  };

  return {
    useStore,
    Provider,
  };
};
