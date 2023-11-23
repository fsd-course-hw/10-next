import { createStrictContext, useStrictContext } from "../react";
import { ToastsContext } from "./types";

export const toastsContext = createStrictContext<ToastsContext>();

export function useToasts() {
  return useStrictContext(toastsContext);
}
