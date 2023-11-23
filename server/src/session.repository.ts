import { persistStorage } from "./storage";
import { SessionDto, SignInDto } from "../generated";
import { usersRepository } from "./users.repository";
import { nanoid } from "nanoid";

const SESSION_STORAGE_KEY = "session_storage";
export const sessionRepository = {
  getSession: () => {
    return persistStorage.getItemSafe<SessionDto | undefined>(
      SESSION_STORAGE_KEY,
      undefined,
    );
  },
  signIn: async (value: SignInDto) => {
    const users = await usersRepository.getUsers();

    const user = users.find(
      (user) => user.email === value.email && user.password === value.password,
    );

    if (!user) {
      return undefined;
    }

    const { id, name, email, avatarId, role } = user;

    const session = {
      avatarId,
      email,
      name,
      role,
      userId: id,
      id: nanoid(),
    } satisfies SessionDto;

    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, session);
  },
  signOut: () => {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, undefined);
  },
};
