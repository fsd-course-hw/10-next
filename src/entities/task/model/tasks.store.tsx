import { create } from "zustand";
import { CreateTaskData, Task, UpdateTaskData } from "./types";
import { api } from "@/shared/api";
import { createStoreContext } from "@/shared/lib/zustand";

export type TasksStore = {
  tasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  loadTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<Task>;
  removeTask: (userId: string) => Promise<void>;
};

export const { useStore: useTasks, Provider: TasksProvider } =
  createStoreContext(({ tasks }: { tasks: Task[] }) =>
    create<TasksStore>((set, get) => ({
      tasks,
      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id);
      },
      loadTasks: async () => {
        set({
          tasks: await api.getTasks(),
        });
      },
      createTask: async (data) => {
        const newTask = await api.createTask(data);

        set({
          tasks: await api.getTasks(),
        });

        return newTask;
      },
      updateTask: async (id, data) => {
        const task = await api.getTaskById(id);
        if (!task) {
          throw new Error();
        }
        const newtask = { ...task, ...data };

        await api.updateTask(id, data);

        set({
          tasks: await api.getTasks(),
        });

        return newtask as Task;
      },
      removeTask: async (userId: string) => {
        await api.deleteTask(userId);
        set({
          tasks: await api.getTasks(),
        });
      },
    })),
  );
