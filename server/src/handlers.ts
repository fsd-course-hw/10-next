import { usersRepository } from "./users.repository";
import {
  BoardPatchDto,
  CreateBoardDto,
  CreateTaskDto,
  CreateUserDto,
  LangDto,
  SignInDto,
  ThemeDto,
  UpdateTaskDto,
} from "../generated";
import { sessionRepository } from "./session.repository";
import { tasksRepository } from "./tasks.repository";
import { boardsRepository } from "./boards.repository";
import { Response, Router } from "express";
import { persistStorage } from "./storage";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const needAuthorization = async (resp: Response) => {
  resp.status(401).send();
};

const unauthorized = async (resp: Response) => {
  resp.status(403).send();
};

const ok = async (resp: Response, body?: unknown) => {
  resp.status(200).json(body).send();
};

export const getHandlers = async () => {
  const router = Router();
  const users = await usersRepository.getUsers();
  if (users.length === 0) {
    await usersRepository.addUser({
      name: "Администрюк",
      email: "admin@gmail.com",
      password: "admin",
      role: "admin",
      avatarId: "1",
    });
  }

  router.get("/api/users", async (_, res) => {
    await delay(1000);
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const users = await usersRepository.getUsers();

    return ok(res, users);
  });

  router.post("/api/users", async ({ body }, res) => {
    await delay(1000);
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    if (sesson.role !== "admin") {
      return unauthorized(res);
    }

    const newUser = await usersRepository.addUser(body as CreateUserDto);

    await delay(1000);
    return ok(res, newUser);
  });

  router.delete("/api/users/:userId", async ({ params }, res) => {
    const userId = params.userId as string;

    await usersRepository.removeUser(userId);

    await delay(1000);

    return ok(res);
  });

  router.get("/api/session/me", async (_, res) => {
    await delay(1000);
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    return ok(res, sesson);
  });

  router.post("/api/session/sign-in", async ({ body }, res) => {
    const result = await sessionRepository.signIn(body as SignInDto);

    if (!result) return needAuthorization(res);

    await delay(1000);
    return ok(res);
  });

  router.post("/api/session/sign-out", async (_, res) => {
    await delay(1000);
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    await sessionRepository.signOut();

    return ok(res);
  });

  router.get("/api/tasks", async (_, res) => {
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const tasks = await tasksRepository.getTasks();

    return ok(res, tasks);
  });

  router.post("/api/tasks", async ({ body }, res) => {
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const task = await tasksRepository.createTask(body as CreateTaskDto);

    return ok(res, task);
  });

  router.get("/api/tasks/:taskId", async ({ params }, res) => {
    const taskId = params.taskId as string;

    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    return ok(res, await tasksRepository.getTask(taskId));
  });

  router.patch("/api/tasks/:taskId", async ({ body, params }, res) => {
    const taskId = params.taskId as string;
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const task = await tasksRepository.updateTask(
      taskId,
      body as UpdateTaskDto,
    );

    return ok(res, task);
  });

  router.delete("/api/tasks/:taskId", async ({ params }, res) => {
    const taskId = params.taskId as string;
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const task = await tasksRepository.removeTask(taskId);

    return ok(res, task);
  });

  router.post("/api/boards", async ({ body }, res) => {
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const board = await boardsRepository.createBoard(body as CreateBoardDto);

    return ok(res, board);
  });

  router.get("/api/boards", async (_, res) => {
    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const boards = await boardsRepository.getBoards();

    const boardsToShow = boards.filter(
      (board) =>
        board.ownerId === sesson.userId ||
        board.editorsIds.includes(sesson.userId),
    );

    return ok(res, boardsToShow);
  }),
    router.get("/api/boards/:boardId", async ({ params }, res) => {
      const boardId = params.boardId as string;

      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization(res);
      }

      const board = await boardsRepository.getBoard(boardId);

      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      if (
        board.ownerId !== sesson.userId &&
        !board.editorsIds.includes(sesson.userId)
      ) {
        return unauthorized(res);
      }

      return ok(res, board);
    });

  router.patch("/api/boards/:boardId", async ({ params, body }, res) => {
    const boardId = params.boardId as string;

    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const board = await boardsRepository.getBoard(boardId);

    if (
      !board ||
      (board.ownerId !== sesson.userId &&
        !board.editorsIds.includes(sesson.userId))
    ) {
      return unauthorized(res);
    }

    await boardsRepository.updateBoard(boardId, body as BoardPatchDto);

    return ok(res, board);
  });

  router.delete("/api/boards/:boardId", async ({ params }, res) => {
    const boardId = params.boardId as string;

    const sesson = await sessionRepository.getSession();

    if (!sesson) {
      return needAuthorization(res);
    }

    const board = await boardsRepository.getBoard(boardId);

    if (!board || !(board.ownerId === sesson.userId)) {
      return unauthorized(res);
    }

    await boardsRepository.removeBoard(boardId);

    return ok(res, board);
  });

  router.get("/api/theme", async (req, res) => {
    return ok(
      res,
      await persistStorage.getItemSafe<ThemeDto>("theme", { theme: "light" }),
    );
  });

  router.post("/api/theme", async (req, res) => {
    const body = req.body as ThemeDto;

    await persistStorage.setItemSafe("theme", body);

    return ok(res);
  });

  router.get("/api/lang", async (req, res) => {
    return ok(
      res,
      await persistStorage.getItemSafe<LangDto>("lang", { lang: "ru" }),
    );
  });

  router.post("/api/lang", async (req, res) => {
    const body = req.body as LangDto;
    await persistStorage.setItemSafe("lang", body);
    return ok(res);
  });

  return router;
};
