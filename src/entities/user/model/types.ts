export type UserRole = "admin" | "user";
export type User = {
  id: string;
  name: string;
  avatarId: string;
  role: UserRole;
  email: string;
};

export type CreateUserData = {
  name: string;
  avatarId: string;
  role: UserRole;
  email: string;
  password: string;
};
