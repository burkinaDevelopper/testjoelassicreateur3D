"use client";
import React, { useEffect } from 'react'
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { SplashScreen } from '@/components/template/SplashScreen';
import { useRouter } from 'next/navigation';
import { useRole } from '../hooks/useRole';
import MonEspaceShell from './components/MonEspaceShell';


// export const metadata: Metadata = {
//   title: "Tailux",
//   description: "Application Next.js avec Tailwind CSS",
// };

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const router = useRouter();
    const { isAuthenticated,status, isApprenant,emailVerifiedAt } = useRole();
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
      if (!emailVerifiedAt) {
        router.replace("/verify-email");
      }
      if (isApprenant) {
        router.replace("/mon-espace");
      }else {
        router.replace("/dashboards/home");
      }
    }, [isAuthenticated, isApprenant, emailVerifiedAt, router]);
  
    if (status === "loading") {
      return <SplashScreen />;
    }
  
  return (
    <MonEspaceShell>
      {children}
      <Toaster position="bottom-right" richColors />
    </MonEspaceShell>
  )
}
