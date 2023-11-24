import { api } from "@/shared/api";

export const loadPrivateLoaderData = async () => {
  try {
    const [users, tasks, boards] = await Promise.all([
      api.getUsers(),
      api.getTasks(),
      api.getBoards(),
    ]);
    return { users, tasks, boards };
  } catch {
    return {};
  }
};
