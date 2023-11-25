import { NextPageLayout } from "@/shared/lib/next";
import { OpenLayout } from "../layouts/open-layout";
import { loadAppLoaderData } from "../loaders/app-loader";

export const getOpenLayout: NextPageLayout = (children) => (
  <OpenLayout>{children}</OpenLayout>
);

export const getOpenRouterLoader = async () => {
  return Object.assign(
    ...(await Promise.all([loadAppLoaderData({ isPublicRoute: true })])),
  );
};
