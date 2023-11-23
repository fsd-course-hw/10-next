// task edidor deps

import { User } from "@/entities/user";
import { createStrictContext } from "@/shared/lib/react";

type UpdateTaskModalDeps = {
  canAssigneUserToTask: (user: User) => boolean;
};

export const updateTaskModalDeps = createStrictContext<UpdateTaskModalDeps>();
