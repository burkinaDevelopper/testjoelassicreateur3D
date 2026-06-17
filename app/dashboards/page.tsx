"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "../hooks/useRole";

export default function DashboardsPage() {
  const router = useRouter();
  const {isAuthenticated,emailVerifiedAt} = useRole();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/register");
    } else if (isAuthenticated && !emailVerifiedAt) {
      router.replace("/verify-email");
    } else if (isAuthenticated && emailVerifiedAt) {
      router.replace("/dashboards/home");
    }
  }, [router, isAuthenticated, emailVerifiedAt]);

  return null;
}
