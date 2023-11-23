import { useState } from "react";
import { Task } from "@/entities/task";
import { UpdateTaskModal } from "./update-task-modal";

export function useUpdateTaskModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (task?: Task) => void;
    taskId: string;
  }>();

  const modal = modalProps ? <UpdateTaskModal {...modalProps} /> : undefined;

  const updateTask = (taskId: string) => {
    return new Promise<Task | undefined>((res) => {
      setModalProps({
        onClose: (task) => {
          res(task);
          setModalProps(undefined);
        },
        taskId,
      });
    });
  };

  return {
    modal,
    updateTask,
  };
}
