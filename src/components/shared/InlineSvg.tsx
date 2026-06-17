"use client";

import { useEffect, useMemo, useState } from "react";

type InlineSvgProps =
  | {
      svg: string;
      src?: undefined;
      className?: string;
      style?: React.CSSProperties;
    }
  | {
      src: string;
      svg?: undefined;
      className?: string;
      style?: React.CSSProperties;
    };

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function styleObjectToString(style?: React.CSSProperties): string {
  if (!style) return "";

  return Object.entries(style)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const cssKey = key.startsWith("--")
        ? key
        : key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      return `${cssKey}:${String(value)}`;
    })
    .join(";");
}

export function InlineSvg(props: InlineSvgProps) {
  const { className, style } = props;
  const styleString = styleObjectToString(style);
  const [fetchedSvg, setFetchedSvg] = useState<string | null>(null);
  const src = "src" in props ? props.src : undefined;

  useEffect(() => {
    if (src === undefined) return;

    let cancelled = false;

    fetch(src)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.status}`);
        return await res.text();
      })
      .then((text) => {
        if (!cancelled) setFetchedSvg(text);
      })
      .catch(() => {
        if (!cancelled) setFetchedSvg(null);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const injected = useMemo(() => {
    const svg = "svg" in props ? props.svg : fetchedSvg;
    if (!svg) return "";

    const classAttr = className ? ` class=\"${escapeAttr(className)}\"` : "";
    const styleAttr = styleString ? ` style=\"${escapeAttr(styleString)}\"` : "";

    return svg.replace(
      /^<svg\b([^>]*)>/,
      `<svg$1${classAttr}${styleAttr}>`,
    );
  }, [props, fetchedSvg, className, styleString]);

  if (!injected) return null;

  return <span aria-hidden dangerouslySetInnerHTML={{ __html: injected }} />;
}
