import { create } from "zustand";
import { CreateUserData, User } from "./types";
import { api } from "@/shared/api";
import { createStoreContext } from "@/shared/lib/zustand";

type UsersStore = {
  users: User[];
  getUserById: (userId: string) => User | undefined;
  usersMap: () => Record<string, User>;
  loadUsers: () => Promise<void>;
  createUser: (data: CreateUserData) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
};

export const { useStore: useUsers, Provider: UsersProvider } =
  createStoreContext(({ users }: { users: User[] }) =>
    create<UsersStore>((set, get) => ({
      users,
      loadUsers: async () => {
        set({
          users: await api.getUsers(),
        });
      },

      usersMap: () => {
        return get().users.reduce(
          (acc, user) => {
            acc[user.id] = user;
            return acc;
          },
          {} as Record<string, User>,
        );
      },
      getUserById: (userId: string) => {
        return get().users.find((user) => user.id === userId);
      },
      createUser: async (data) => {
        await api.createUser(data);
        set({
          users: await api.getUsers(),
        });
      },
      removeUser: async (userId: string) => {
        await api.deleteUser(userId);
        set({
          users: await api.getUsers(),
        });
      },
    })),
  );
