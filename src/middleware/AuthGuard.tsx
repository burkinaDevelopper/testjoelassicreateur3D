// Import Dependencies
import { Navigate, useLocation, useOutlet } from "@/router";
import { useSession } from "next-auth/react";

// Local Imports
import { GHOST_ENTRY_PATH, REDIRECT_URL_KEY } from "@/constants/app";

// ----------------------------------------------------------------------

export default function AuthGuard() {
  const outlet = useOutlet();
  const { status } = useSession();

  const location = useLocation();

  if (status === "unauthenticated") {
    return (
      <Navigate
        to={`${GHOST_ENTRY_PATH}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  if (status === "loading") {
    return null;
  }

  return <>{outlet}</>;
}
