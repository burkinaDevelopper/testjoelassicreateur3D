export function getMediaUrl(path?: string | null) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/storage/")) {
    return `/api/media?path=${encodeURIComponent(path)}`;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  return `${baseUrl}${path}`;
}
