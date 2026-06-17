"use client";

import { Page } from "@/components/shared/Page";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "../../hooks/useRole";


export default function Home() {
 
    const router = useRouter();
    const {isAuthenticated,emailVerifiedAt} = useRole();
    const { data: session, status } = useSession();
    console.log("Session:", session);

    // useEffect(() => {
    //   if (!isAuthenticated) {
    //     router.replace("/register");
    //   } else if (isAuthenticated && !emailVerifiedAt) {
    //     router.replace("/verify-email");
    //   } else if (isAuthenticated && emailVerifiedAt) {
    //     router.replace("/dashboards/home");
    //   }
    // }, [router, isAuthenticated, emailVerifiedAt]);
  
  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
            Blank Page
          </h2>
        </div>
      </div>
    </Page>
  );
}
