import { getOpenLayout, getOpenRouterLoader } from "@/app/pub/get-open-layout";
import { SignInPage } from "@/pages/sign-in";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SignInPage, getOpenLayout);

export const getServerSideProps = async () => {
  const props = await getOpenRouterLoader();
  return {
    props,
  };
};
