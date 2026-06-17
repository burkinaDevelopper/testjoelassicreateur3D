import { InlineSvg } from "@/components/shared/InlineSvg";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 540 368">
<path d="M201.6 289.1c0 26.5-17.7 48-39.6 48s-39.6-21.5-39.6-48 17.7-48 39.6-48 39.6 21.5 39.6 48Z" fill="#E8EBF2"/>
</svg>`;

// Placeholder minimal SVG. Replace with full illustration if needed.
// (This file exists only to remove SVGR dependency under Turbopack.)

export default function Authorize({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <InlineSvg svg={svg} className={className} style={style} />;
}
