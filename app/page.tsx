"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "./hooks/useRole";

export default function HomePage() {
  const router = useRouter();
  const { currentUser, isApprenant, status } = useRole();

  useEffect(() => {
    // Attendre que NextAuth ait résolu la session.
    if (status === "loading") return;

    // Si non authentifié, on envoie vers la page de login.
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    // Page racine : redirige vers l'espace selon le rôle.
    router.replace(isApprenant ? "/mon-espace" : "/dashboards/home");
  }, [router, status, currentUser, isApprenant]);

  return null;
}
