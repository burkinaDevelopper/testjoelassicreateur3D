import React, { useEffect } from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type To = string;

type NavLinkClassNameFn = (args: { isActive: boolean; isPending: boolean }) => string;
type NavLinkChildrenFn = (args: { isActive: boolean; isPending: boolean }) => React.ReactNode;

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  to: To;
};

export function Link({ to, ...props }: LinkProps) {
  return <NextLink href={to} {...props} />;
}

type NavLinkProps = Omit<React.ComponentProps<typeof NextLink>, "href" | "className" | "children"> & {
  to: To;
  end?: boolean;
  className?: string | NavLinkClassNameFn;
  children?: React.ReactNode | NavLinkChildrenFn;
};

export function NavLink({
  to,
  end = false,
  className,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname() ?? "";

  const normalizedTo = to.endsWith("/") && to !== "/" ? to.slice(0, -1) : to;
  const isActive = end
    ? pathname === normalizedTo
    : pathname === normalizedTo || pathname.startsWith(`${normalizedTo}/`);

  const resolvedClassName =
    typeof className === "function" ? className({ isActive, isPending: false }) : className;

  const resolvedChildren =
    typeof children === "function" ? children({ isActive, isPending: false }) : children;

  return (
    <NextLink href={to} className={resolvedClassName} {...props}>
      {resolvedChildren}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const search = searchParams?.toString()
    ? `?${searchParams.toString()}`
    : "";
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  return { pathname, search, hash };
}

// --------------------
// Minimal stubs so legacy (react-router) files still typecheck.
// These are not intended to be used for routing in Next.js.

export type RouteObject = any;

export function Outlet() {
  return null;
}

export function ScrollRestoration() {
  return null;
}

export function useRouteLoaderData(_id: string): any {
  return undefined;
}

export function useNavigation(): {
  state: "idle" | "loading" | "submitting";
  formData?: FormData;
  location?: { pathname: string };
} {
  return { state: "idle" };
}

export function useRouteError(): unknown {
  return null;
}

export function isRouteErrorResponse(_error: unknown): boolean {
  return false;
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);

  return null;
}

export function createBrowserRouter(_routes: any, _opts?: any): any {
  return null;
}

export function useOutlet(): any {
  return null;
}
