import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { BoardsList, CreateBoardButton } from "@/features/boards-list";

export function BoardsPage() {
  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Доски</h1>
      <div className="flex gap-2 mt-10">
        <CreateBoardButton />
      </div>
      <BoardsList className="mt-10" />
    </UiCetnerContentLayout>
  );
}
