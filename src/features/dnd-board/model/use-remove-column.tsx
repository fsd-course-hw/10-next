import { BoardCol } from "@/entities/board";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useBoardStore } from "./use-board-store";

export function useRemoveColumn(col: BoardCol) {
  const getConfirmation = useGetConfirmation();
  const removeColumn = useBoardStore().useSelector((s) => s.removeColumn);

  const handleRemove = async () => {
    const confirmatin = await getConfirmation({
      title: "Удаление колонки",
      description: "Вы уверены, что хотите удалить эту колонку?",
    });

    if (!confirmatin) {
      return;
    }

    removeColumn(col.id);
  };

  return { handleRemove };
}
