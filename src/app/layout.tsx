import { AppLayout } from "./_/layouts/app-layout";
import { AppLoader } from "./_/loaders/app-loader";
import { loadAppLoaderData } from "./_/loaders/load-app-loader-data";
import { AppProvider } from "./_/providers/app-provider";
import './_/global.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await loadAppLoaderData();
  return (
    <html lang="en">
      <body>
        <AppLoader data={data}>
          <AppProvider>
            <AppLayout>{children}</AppLayout>
          </AppProvider>
        </AppLoader>
        <div id="modals" />
      </body>
    </html>
  );
}
