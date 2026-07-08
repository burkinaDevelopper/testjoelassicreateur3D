"use client"
import parse from "html-react-parser"
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
import clsx from "clsx"

interface DeltaRendererProps {
  value: string | null | undefined
  className?: string
  plain?: boolean
}

function extractPlainText(value: string): string {
  try {
    const delta = JSON.parse(value)
    return (delta.ops ?? [])
      .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
      .join("")
      .replace(/\n+/g, " ")
      .trim()
  } catch {
    return value ?? ""
  }
}

export function DeltaRenderer({ value, className, plain }: DeltaRendererProps) {
  if (!value) return null

  if (plain) {
    return (
      <p className={clsx("text-sm text-gray-600 dark:text-dark-300", className)}>
        {extractPlainText(value)}
      </p>
    )
  }

  try {
    const delta = JSON.parse(value)
    const converter = new QuillDeltaToHtmlConverter(delta.ops ?? [], {})
    const html = converter.convert()
    return (
      <div className={clsx("ql-editor p-0! overflow-hidden! text-sm text-gray-600 dark:text-dark-300", className)}>
        {parse(html)}
      </div>
    )
  } catch {
    return (
      <p className={clsx("text-sm text-gray-600 dark:text-dark-300 leading-relaxed whitespace-pre-line", className)}>
        {value}
      </p>
    )
  }
}
