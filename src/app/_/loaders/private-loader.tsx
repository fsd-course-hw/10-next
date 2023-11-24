"use client";
import { BoardsProvider } from "@/entities/board";
import { useSession } from "@/entities/session";
import { TasksProvider } from "@/entities/task";
import { UsersProvider } from "@/entities/user";
import { ROUTER_PATHS } from "@/shared/constants";
import { ComposeChildren, useEventCallback } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadPrivateLoaderData } from "./load-private-loader-data";

export function PrivateLoader({
  children,
  data: defaultData,
}: {
  children?: React.ReactNode;
  data?: Awaited<ReturnType<typeof loadPrivateLoaderData>>;
}) {
  const [data, setData] = useState(defaultData);
  const tasks = data?.tasks;
  const boards = data?.boards;
  const users = data?.users;

  const isData = tasks && boards && users;

  const router = useRouter();
  const session = useSession((s) => s.currentSession);

  const [isLoading, setIsLoading] = useState(!isData);

  const routerPush = useEventCallback(router.push);
  useEffect(() => {
    if (!session) {
      routerPush(ROUTER_PATHS.SIGN_IN);
      return;
    }

    if (isData) {
      return;
    }

    setIsLoading(true);
    loadPrivateLoaderData()
      .then(setData)
      .finally(() => {
        setIsLoading(false);
      });
  }, [session, routerPush, isData]);

  return (
    <>
      <UiPageSpinner isLoading={isLoading} />
      {isLoading ? null : (
        <ComposeChildren>
          <UsersProvider value={{ users: users ?? [] }} />
          <BoardsProvider value={{ boards: boards ?? [] }} />
          <TasksProvider value={{ tasks: tasks ?? [] }} />
          {children}
        </ComposeChildren>
      )}
    </>
  );
}
