import { NextPageLayout } from "@/shared/lib/next";
import { PrivateLayout } from "../layouts/private-layout";
import {
  PrivateLoader,
  loadPrivateLoaderData,
} from "../loaders/private-loader";
import { PrivateProvider } from "../providers/private-provider";
import { loadAppLoaderData } from "../loaders/app-loader";

export const getPrivateLayout: NextPageLayout = (children, data) => (
  <PrivateLoader data={data}>
    <PrivateProvider>
      <PrivateLayout>{children}</PrivateLayout>
    </PrivateProvider>
  </PrivateLoader>
);

export const getPrivateRouterLoader = async () => {
  return Object.assign(
    ...(await Promise.all([loadAppLoaderData(), loadPrivateLoaderData()])),
  );
};
