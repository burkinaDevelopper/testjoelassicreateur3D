import { COLORS, ColorType } from "@/constants/app";

export function colorFromText(text?: string | null): ColorType {
  const safeText = (text ?? "").toString();
  if (!safeText) return COLORS[0];

  const lastChar = safeText.charAt(safeText.length - 1);
  const charCode = lastChar.toLowerCase().charCodeAt(0);
  if (!Number.isFinite(charCode)) return COLORS[0];

  const index = charCode % COLORS.length;
  return COLORS[index] ?? COLORS[0];
}
