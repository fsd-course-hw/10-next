import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/app/pub/get-private-layout";
import { BoardsPage } from "@/pages/boards";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(BoardsPage, getPrivateLayout);

export const getServerSideProps = async () => {
  const props = await getPrivateRouterLoader();
  return {
    props,
  };
};
