"use client";

import { lazy, useEffect, useMemo } from "react";
import { useThemeContext } from "@/app/contexts/theme/context";
import { Loadable } from "@/components/shared/Loadable";
import { SplashScreen } from "@/components/template/SplashScreen";
import { ThemeLayout} from "@/configs/@types/theme";
import { useRouter } from "next/navigation";
import { useRole } from '../hooks/useRole';


const themeLayouts: Record<
  ThemeLayout,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  "main-layout": lazy(() => import("@/app/layouts/MainLayout")),
  sideblock: lazy(() => import("@/app/layouts/Sideblock")),
};

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated,status, isAdmin,emailVerifiedAt } = useRole();
  const router = useRouter();
  const { themeLayout } = useThemeContext();

  const CurrentLayout = useMemo(() => {
    return Loadable(
      themeLayouts[themeLayout] || themeLayouts["main-layout"],
      SplashScreen,
    );
  }, [themeLayout]);

  
     useEffect(() => {
       if (!isAuthenticated) {
         router.replace("/login");
       }
       if (!emailVerifiedAt) {
         router.replace("/verify-email");
       }
       if (isAdmin) {
         router.replace("/dashboards/home");
       }else {
         router.replace("/mon-espace");
       }
     }, [isAuthenticated, isAdmin, emailVerifiedAt, router]);

  if (status === "loading") {
    return <SplashScreen />;
  }

  return <CurrentLayout>{children}</CurrentLayout>;
}
