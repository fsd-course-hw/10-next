import { OpenLayout } from "../_/layouts/open-layout";

export default async function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OpenLayout>{children}</OpenLayout>;
}
