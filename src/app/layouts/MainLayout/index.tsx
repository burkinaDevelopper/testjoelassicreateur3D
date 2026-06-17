// Import Dependencies
import clsx from "clsx";
import { ReactNode } from "react";

// Local Imports
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

// ----------------------------------------------------------------------

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main
        className={clsx("main-content transition-content grid grid-cols-1")}
      >
        {children}
      </main>
      <Sidebar />
    </>
  );
}
