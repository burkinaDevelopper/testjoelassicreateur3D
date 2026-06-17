// Import Dependencies
import { Navigate, useOutlet } from "@/router";
import { useSession } from "next-auth/react";

// Local Imports
import { HOME_PATH, REDIRECT_URL_KEY } from "@/constants/app";

// ----------------------------------------------------------------------


export default function GhostGuard() {
  const outlet = useOutlet();
  const { status } = useSession();

  const url = `${new URLSearchParams(window.location.search).get(
    REDIRECT_URL_KEY,
  )}`;

  if (status === "authenticated") {
    if (url && url !== "") {
      return <Navigate to={url} />;
    }
    return <Navigate to={HOME_PATH} />;
  }

  if (status === "loading") {
    return null;
  }

  return <>{outlet}</>;
}
