import { persistStorage } from "./storage";
import { UserDto, CreateUserDto } from "../generated";
import { nanoid } from "nanoid";
import { tasksRepository } from "./tasks.repository";
import { boardsRepository } from "./boards.repository";

type User = UserDto & {
  password: string;
};

const USERS_STORAGE_KEY = "users_storsage";
export const usersRepository = {
  getUsers: () => {
    return persistStorage.getItemSafe<User[]>(USERS_STORAGE_KEY, []);
  },
  addUser: async (value: CreateUserDto) => {
    const users = await usersRepository.getUsers();
    const newUser = {
      ...value,
      id: nanoid(),
    };
    await persistStorage.setItemSafe<User[]>(
      USERS_STORAGE_KEY,
      users.concat([newUser]),
    );
    return newUser;
  },
  removeUser: async (userId: string) => {
    const users = await usersRepository.getUsers();
    await persistStorage.setItemSafe(
      USERS_STORAGE_KEY,
      users.filter((user) => user.id !== userId),
    );
    await tasksRepository.removeUserTasks(userId);
    await boardsRepository.removeAuthorFromBoards(userId);
  },
};
