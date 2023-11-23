import { NextPageLayout } from "@/shared/lib/next";
import { OpenLayout } from "../layouts/open-layout";

export const getOpenLayout: NextPageLayout = (children) => (
  <OpenLayout>{children}</OpenLayout>
);
