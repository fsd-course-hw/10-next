import {
  getPrivateLayout,
  getPrivateRouterLoader,
} from "@/app/pub/get-private-layout";
import { UsersPage } from "@/pages/users";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(UsersPage, getPrivateLayout);

export const getServerSideProps = async () => {
  return {
    props: await getPrivateRouterLoader(),
  };
};
