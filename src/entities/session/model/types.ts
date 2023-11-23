type Role = "admin" | "user";

export type Session = {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarId: string;
  role: Role;
};
