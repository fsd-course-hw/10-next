/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Full API - Users, Sessions, Tasks, Boards
 * API for managing users, sessions, tasks, and boards
 * OpenAPI spec version: 1.0.0
 */
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
export type LangDtoLang = (typeof LangDtoLang)[keyof typeof LangDtoLang];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LangDtoLang = {
  en: "en",
  ru: "ru",
} as const;

export interface LangDto {
  lang: LangDtoLang;
}

export type ThemeDtoTheme = (typeof ThemeDtoTheme)[keyof typeof ThemeDtoTheme];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ThemeDtoTheme = {
  light: "light",
  dark: "dark",
} as const;

export interface ThemeDto {
  theme: ThemeDtoTheme;
}

export interface UpdateTaskDto {
  assigneeId?: string;
  authorId?: string;
  description?: string;
  title?: string;
}

export interface CreateTaskDto {
  assigneeId?: string;
  authorId: string;
  description?: string;
  title: string;
}

export interface TaskDto {
  assigneeId?: string;
  authorId: string;
  description?: string;
  id: string;
  title: string;
}

export interface BoardCardDto {
  assigneeId?: string;
  id: string;
  name: string;
}

export interface BoardColDto {
  id: string;
  items: BoardCardDto[];
  name: string;
}

export interface BoardPatchDto {
  cols?: BoardColDto[];
  editorsIds?: string[];
  id?: string;
  name?: string;
  ownerId?: string;
}

export interface BoardPartialDto {
  editorsIds: string[];
  id: string;
  name: string;
  ownerId: string;
}

export interface BoardDto {
  cols: BoardColDto[];
  editorsIds: string[];
  id: string;
  name: string;
  ownerId: string;
}

export interface CreateBoardDto {
  editorsIds: string[];
  name: string;
  ownerId: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserRole = {
  admin: "admin",
  user: "user",
} as const;

export interface SessionDto {
  avatarId: string;
  email: string;
  id: string;
  name: string;
  role: UserRole;
  userId: string;
}

export interface CreateUserDto {
  avatarId: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export interface UserDto {
  avatarId: string;
  email: string;
  id: string;
  name: string;
  role: UserRole;
}

/**
 * @summary Get all users
 */
export const getUsers = <TData = AxiosResponse<UserDto[]>>(
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/users`, options);
};

/**
 * @summary Add a new user
 */
export const createUser = <TData = AxiosResponse<UserDto>>(
  createUserDto: CreateUserDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/users`, createUserDto, options);
};

/**
 * @summary Remove a user by ID
 */
export const deleteUser = <TData = AxiosResponse<void>>(
  userId: string,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.delete(`/users/${userId}`, options);
};

/**
 * @summary Get current session
 */
export const getSession = <TData = AxiosResponse<SessionDto>>(
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/session/me`, options);
};

/**
 * @summary Sign in
 */
export const signIn = <TData = AxiosResponse<SessionDto>>(
  signInDto: SignInDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/session/sign-in`, signInDto, options);
};

/**
 * @summary Sign out
 */
export const signOut = <TData = AxiosResponse<void>>(
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/session/sign-out`, undefined, options);
};

/**
 * @summary Get all tasks
 */
export const getTasks = <TData = AxiosResponse<TaskDto[]>>(
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/tasks`, options);
};

/**
 * @summary Add a new task
 */
export const createTask = <TData = AxiosResponse<TaskDto>>(
  createTaskDto: CreateTaskDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/tasks`, createTaskDto, options);
};

/**
 * @summary Get a task by ID
 */
export const getTaskById = <TData = AxiosResponse<TaskDto>>(
  taskId: string,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/tasks/${taskId}`, options);
};

/**
 * @summary Add a new task
 */
export const updateTask = <TData = AxiosResponse<void>>(
  taskId: string,
  updateTaskDto: UpdateTaskDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.patch(`/tasks/${taskId}`, updateTaskDto, options);
};

/**
 * @summary Remove a task by ID
 */
export const deleteTask = <TData = AxiosResponse<void>>(
  taskId: string,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.delete(`/tasks/${taskId}`, options);
};

/**
 * @summary Get all boards
 */
export const getBoards = <TData = AxiosResponse<BoardPartialDto[]>>(
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/boards`, options);
};

/**
 * @summary Add a new board
 */
export const createBoard = <TData = AxiosResponse<BoardDto>>(
  createBoardDto: CreateBoardDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/boards`, createBoardDto, options);
};

/**
 * @summary Get a board by ID
 */
export const getBoardById = <TData = AxiosResponse<BoardDto>>(
  boardId: string,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/boards/${boardId}`, options);
};

/**
 * @summary Patch a board
 */
export const updateBoard = <TData = AxiosResponse<void>>(
  boardId: string,
  boardDto: BoardDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.patch(`/boards/${boardId}`, boardDto, options);
};

/**
 * @summary Remove a board by ID
 */
export const deleteBoard = <TData = AxiosResponse<void>>(
  boardId: string,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.delete(`/boards/${boardId}`, options);
};

/**
 * @summary Get current lang
 */
export const getLang = <TData = AxiosResponse<LangDto>>(
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/lang`, options);
};

/**
 * @summary Set current lang
 */
export const setLang = <TData = AxiosResponse<void>>(
  langDto: LangDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/lang`, langDto, options);
};

/**
 * @summary Get current theme
 */
export const getTheme = <TData = AxiosResponse<ThemeDto>>(
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.get(`/theme`, options);
};

/**
 * @summary Set current theme
 */
export const setTheme = <TData = AxiosResponse<void>>(
  themeDto: ThemeDto,
  options?: AxiosRequestConfig,
): Promise<TData> => {
  return axios.post(`/theme`, themeDto, options);
};

export type GetUsersResult = AxiosResponse<UserDto[]>;
export type CreateUserResult = AxiosResponse<UserDto>;
export type DeleteUserResult = AxiosResponse<void>;
export type GetSessionResult = AxiosResponse<SessionDto>;
export type SignInResult = AxiosResponse<SessionDto>;
export type SignOutResult = AxiosResponse<void>;
export type GetTasksResult = AxiosResponse<TaskDto[]>;
export type CreateTaskResult = AxiosResponse<TaskDto>;
export type GetTaskByIdResult = AxiosResponse<TaskDto>;
export type UpdateTaskResult = AxiosResponse<void>;
export type DeleteTaskResult = AxiosResponse<void>;
export type GetBoardsResult = AxiosResponse<BoardPartialDto[]>;
export type CreateBoardResult = AxiosResponse<BoardDto>;
export type GetBoardByIdResult = AxiosResponse<BoardDto>;
export type UpdateBoardResult = AxiosResponse<void>;
export type DeleteBoardResult = AxiosResponse<void>;
export type GetLangResult = AxiosResponse<LangDto>;
export type SetLangResult = AxiosResponse<void>;
export type GetThemeResult = AxiosResponse<ThemeDto>;
export type SetThemeResult = AxiosResponse<void>;
