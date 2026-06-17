"use client";

import { useLayoutEffect } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MonEspaceShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const previousLayout = document?.body?.dataset?.layout;
    document.body.dataset.layout = "sideblock";

    return () => {
      if (previousLayout) {
        document.body.dataset.layout = previousLayout;
      } else {
        delete document.body.dataset.layout;
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="main-content transition-content flex min-h-[calc(100vh-61px)]">
        <Sidebar />
        <section className="w-full px-(--margin-x) py-6">{children}</section>
      </main>
    </>
  );
}
