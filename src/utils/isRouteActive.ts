/**
 * Checks if the given path matches the current pathname.
 *
 * @param The path to check against the current location.
 * @param The current path of the browser.
 * @returns Returns `true` if the path matches the current pathname, otherwise `false`.
 */
export function isRouteActive(
  path: string | undefined,
  pathname: string,
): boolean {
  if (!path) return false;
  if (path === "/") return pathname === "/";

  const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
  return (
    pathname === normalizedPath || pathname.startsWith(`${normalizedPath}/`)
  );
}
