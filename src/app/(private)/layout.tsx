import { PrivateLayout } from "../_/layouts/private-layout";
import { loadPrivateLoaderData } from "../_/loaders/load-private-loader-data";
import { PrivateLoader } from "../_/loaders/private-loader";
import { PrivateProvider } from "../_/providers/private-provider";

export default async function PrivateGroupLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const data = await loadPrivateLoaderData();
  return (
    <PrivateLoader data={data}>
      <PrivateProvider>
        <PrivateLayout>{children}</PrivateLayout>
      </PrivateProvider>
    </PrivateLoader>
  );
}
