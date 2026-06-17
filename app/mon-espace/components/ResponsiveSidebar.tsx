"use client";

import Link from "next/link";
import { Portal } from "@headlessui/react";
import { clsx } from "clsx";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui";
import { useBreakpointsContext } from "@/app/contexts/breakpoint/context";
import { useSidebarContext } from "@/app/contexts/sidebar/context";
import { useThemeContext } from "@/app/contexts/theme/context";
import { useDidUpdate } from "@/hooks";
import { House } from 'lucide-react';
import Image from "next/image";

export function Sidebar({learner}: any) {
  const { cardSkin } = useThemeContext();
  const { name, lgAndDown } = useBreakpointsContext();
  const { isExpanded, close } = useSidebarContext();

  // Sur changement de breakpoint (ex rotation / resize), on ferme le sidebar mobile.
  useDidUpdate(() => {
    if (isExpanded) close();
  }, [name]);
 
  

  return (
    <aside
      className={clsx(
        "sidebar-panel",
        cardSkin === "shadow"
          ? "shadow-soft dark:shadow-dark-900/60"
          : "border-gray-200 dark:border-dark-600/80 ltr:border-r rtl:border-l",
      )}
    >
      <div
        className={clsx(
          "flex h-full grow flex-col bg-white",
          cardSkin === "shadow" ? "dark:bg-dark-750" : "dark:bg-dark-900",
        )}
      >
        <div className="relative flex h-15.25 shrink-0 items-center justify-between ltr:pl-6 ltr:pr-3 rtl:pl-3 rtl:pr-6">
          
          <div  onClick={() => {
              if (lgAndDown) close();
            }}
            className="w-32 h-9">
              <img src={learner?.organisme?.logo } alt="Logo" className="inline-block mr-2 w-auto h-full"/>
          </div>

          <div className="xl:hidden">
            <Button
              onClick={close}
              variant="flat"
              isIcon
              className="size-8 rounded-full"
              aria-label="Fermer le menu"
            >
              <ChevronLeftIcon className="size-5 rtl:rotate-180" />
            </Button>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-3">
          <Link
            href="/mon-espace"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:text-dark-100 dark:hover:bg-dark-800"
            onClick={() => {
              if (lgAndDown) close();
            }}
          >
            <House className="inline-block mr-2" />Tableau de bord
          </Link>
        </nav>
      </div>

      {lgAndDown && isExpanded && (
        <Portal>
          <div
            onClick={close}
            className="fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/40"
          />
        </Portal>
      )}
    </aside>
  );
}
