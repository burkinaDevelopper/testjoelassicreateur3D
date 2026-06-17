// Import Dependencies
import { Outlet, ScrollRestoration } from "@/router";
import { lazy } from "react";
import { useSession } from "next-auth/react";

// Local Imports
import { SplashScreen } from "@/components/template/SplashScreen";
import { Loadable } from "@/components/shared/Loadable";
import { Progress } from "@/components/template/Progress";

const Toaster = Loadable(lazy(() => import("@/components/template/Toaster")));
// const Customizer = Loadable(
//   lazy(() => import("components/template/Customizer")),
// );
const Tooltip = Loadable(lazy(() => import("@/components/template/Tooltip")));

// ----------------------------------------------------------------------

function Root() {
  const { status } = useSession();

  if (status === "loading") {
    return <SplashScreen />;
  }

  return (
    <>
      <Progress />
      <ScrollRestoration />
      <Outlet />
      <Tooltip />
      <Toaster />
      {/* <Customizer /> */}
    </>
  );
}

export default Root;
