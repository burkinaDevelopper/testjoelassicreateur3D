"use client";


// Local Imports
import { Page } from "@/components/shared/Page";
import { Header } from "@/app/layouts/MainLayout/Header";
import { Card } from "@/components/ui";

// ----------------------------------------------------------------------

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <Page title="Homepage">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <Card className="h-full w-full p-4 sm:px-5 2xl:mx-auto 2xl:max-w-5xl">
         {children}
        </Card>
      </div>
    </Page>
  );
}
