import { api } from "@/shared/api";

export const loadAppLoaderData = async () => {
  try {
    const session = await api.getSession();
    return { session };
  } catch {
    return {};
  }
};
