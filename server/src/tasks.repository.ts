import { persistStorage } from "./storage";
import { TaskDto, CreateTaskDto, UpdateTaskDto } from "../generated";
import { nanoid } from "nanoid";

const TASKS_STORAGE_KEY = "tasks_storsage";
export const tasksRepository = {
  getTasks: async (): Promise<TaskDto[]> => {
    return persistStorage.getItemSafe<TaskDto[]>(TASKS_STORAGE_KEY, []);
  },
  getTask: async (id: string): Promise<TaskDto | undefined> => {
    return persistStorage
      .getItemSafe<TaskDto[]>(TASKS_STORAGE_KEY, [])
      .then((tasks) => tasks.find((task) => task.id === id));
  },
  createTask: async (value: CreateTaskDto) => {
    const tasks = await tasksRepository.getTasks();

    const newTask = {
      ...value,
      id: nanoid(),
    };

    tasks.push(newTask);

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks);

    return newTask;
  },

  updateTask: async (id: string, value: UpdateTaskDto) => {
    const tasks = await tasksRepository.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return;
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...value,
    };

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks);
  },

  removeTask: async (taskId: string) => {
    const tasks = await tasksRepository.getTasks();
    await persistStorage.setItemSafe(
      TASKS_STORAGE_KEY,
      tasks.filter((task) => task.id !== taskId),
    );
  },

  removeUserTasks: async (userId: string) => {
    const tasks = await tasksRepository.getTasks();
    const tasksToRemove = tasks.filter((task) => task.authorId === userId);

    for (const task of tasksToRemove) {
      await tasksRepository.removeTask(task.id);
    }
  },
};
