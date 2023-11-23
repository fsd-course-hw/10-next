import { BoardPartial } from "@/entities/board";
import { useSession } from "@/entities/session";
import { useTasks } from "@/entities/task";
import { boardDepsContext } from "@/features/dnd-board";
import { useCanUserAccessBoard } from "@/features/manage-board-access";
import {
  updateTaskModalDeps,
  useUpdateTaskModal,
} from "@/features/update-task-modal";

export function TaskEditorProvider({
  children,
  board,
}: {
  children?: React.ReactNode;
  board: BoardPartial;
}) {
  const canUserAccessBoard = useCanUserAccessBoard();

  return (
    <updateTaskModalDeps.Provider
      value={{
        canAssigneUserToTask: (user) => canUserAccessBoard(user.id, board),
      }}
    >
      {children}
    </updateTaskModalDeps.Provider>
  );
}

export function BoardDepsProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const sesson = useSession((s) => s.currentSession);
  const removeTask = useTasks((s) => s.removeTask);
  const createTask = useTasks((s) => s.createTask);
  const { modal, updateTask } = useUpdateTaskModal();

  return (
    <boardDepsContext.Provider
      value={{
        createBoardCard: async (title: string) => {
          if (!sesson) throw new Error();
          const task = await createTask({ authorId: sesson?.userId, title });

          return {
            ...task,
            name: task.title,
          };
        },
        onBeforeRemoveBoardCard: async (id: string) => {
          await removeTask(id);
        },
        updateBoardCard: async (board) => {
          const task = await updateTask(board.id);
          if (!task) throw new Error();
          return {
            ...task,
            name: task.title,
          };
        },
      }}
    >
      {children}
      {modal}
    </boardDepsContext.Provider>
  );
}
