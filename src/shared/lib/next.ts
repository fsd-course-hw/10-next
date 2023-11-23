export const isClient = () => {
  return typeof window !== "undefined";
};

export type NextPageLayout = (
  page: React.ReactElement,
  data?: any,
) => React.ReactNode;

export const setPageLayout = (
  page: () => React.ReactElement,
  layout: NextPageLayout,
) => {
  const pageWithLayout = page as (() => React.ReactElement) & {
    getLayout?: NextPageLayout;
  };

  pageWithLayout.getLayout = layout;

  return pageWithLayout;
};
