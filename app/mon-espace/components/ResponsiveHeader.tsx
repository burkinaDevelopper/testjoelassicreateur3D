"use client";

import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui";
import { useSidebarContext } from "@/app/contexts/sidebar/context";
import { Profile } from "./Profile";

export function Header() {
  const { open } = useSidebarContext();

  return (
    <header className="app-header flex h-15.25 items-center justify-between border-b border-gray-200 bg-white px-(--margin-x) dark:border-dark-600/80 dark:bg-dark-900">
      <div className="xl:hidden">
        <Button
          onClick={open}
          variant="flat"
          isIcon
          className="size-9 rounded-full"
          aria-label="Ouvrir le menu"
        >
          <Bars3Icon className="size-5" />
        </Button>
      </div>

      <Link
        href="/mon-espace"
        className="hidden md:flex text-base font-semibold tracking-wide text-gray-900 dark:text-dark-50"
      >
        Mon Espace
      </Link>
      <Profile />
    </header>
  );
}
