import {
  Board,
  BoardActions,
  BoardSearch,
  BoardSearchProvider,
  BoardStoreProvider,
  useFetchBoard,
} from "@/features/dnd-board";
import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { BoardDepsProvider, TaskEditorProvider } from "./providers";
import {
  BoardEditors,
  UpdateBoardAccessButton,
} from "@/features/manage-board-access";
import { useBoardPageAblity } from "./model/use-board-page-ablity";
import { subject } from "@casl/ability";
import { useRouter } from "next/router";

function useBoard() {
  const { query } = useRouter();
  const boardId = query.boardId as string;
  const { board, fetchBoard } = useFetchBoard(boardId);

  return { board, fetchBoard };
}

export function BoardPage() {
  const { board, fetchBoard } = useBoard();
  const boardPageAbility = useBoardPageAblity();

  if (!board) {
    return <UiPageSpinner />;
  }

  const canUpdateAccess = boardPageAbility.can(
    "update-access",
    subject("Board", board),
  );

  return (
    <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider />
      <BoardStoreProvider board={board} />
      <BoardSearchProvider />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.name}</h1>
        <div className="shrink-0 mb-2 flex gap-5">
          <BoardActions />
          <BoardSearch className="w-[250x]" />
          <div className="flex gap-2 items-center">
            <div>Редакторы: </div>
            <BoardEditors board={board} />

            {canUpdateAccess && (
              <UpdateBoardAccessButton
                board={board}
                onUpdate={() => fetchBoard()}
              />
            )}
          </div>
        </div>
        <Board className="basis-0 grow" />
      </div>
    </ComposeChildren>
  );
}
