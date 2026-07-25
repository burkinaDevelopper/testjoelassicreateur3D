'use client'
// Import Dependencies
import {
  ArrowDownTrayIcon,
  CheckIcon,
  ClockIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/20/solid";
import { Row } from "@tanstack/react-table";

// Local Imports
import { Badge, Button } from "@/components/ui";
import { useClipboard } from "@/hooks";
import { getMediaUrl } from "@/utils/getMediaUrl";
import { type Item } from "./typeData";

// ----------------------------------------------------------------------

export function SubRowComponent({
  row,
  cardWidth,
}: {
  row: Row<Item>;
  cardWidth?: number;
}) {
  const { copy, copied } = useClipboard({ timeout: 2000 });
  const fileUrl = getMediaUrl(row.original?.url_file);

  return (
    <div
      className="dark:border-b-dark-500 dark:bg-dark-750 sticky border-b border-b-gray-200 bg-gray-50 pt-3 pb-4 ltr:left-0 rtl:right-0"
      style={{ maxWidth: cardWidth }}
    >
      <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-3">
        <div>
          <p className="font-medium">Slug:</p>
          <div className="mt-3 flex max-w-xs flex-wrap gap-2">
            <Badge className="capitalize" variant="soft">
              {row.original?.slug}
            </Badge>
          </div>
        </div>
        <div>
          <p className="font-medium">Description:</p>
          <p className="mt-3 max-w-xs">
            {row.original?.description || "Aucune description"}
          </p>
        </div>
        <div>
          <p className="font-medium">Miniature:</p>
          <div className="mt-3 space-y-2">
            {row.original?.thumbnail_url ? (
              <img
                src={getMediaUrl(row.original.thumbnail_url)}
                alt="thumbnail"
                className="h-30 w-60 rounded-lg object-contain"
              />
            ) : (
              "Aucune miniature"
            )}
          </div>
          {fileUrl && (
            <div className="dark:border-dark-500 dark:bg-dark-800 mt-3 max-w-xs rounded-lg border border-gray-200 bg-white p-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="dark:text-dark-200 grow truncate text-xs text-gray-500"
                  title={fileUrl}
                >
                  {fileUrl}
                </span>
                <Button
                  isIcon
                  variant="flat"
                  color={copied ? "success" : undefined}
                  className="size-6 shrink-0 rounded-full"
                  onClick={() => copy(fileUrl)}
                  data-tooltip
                  data-tooltip-content={copied ? "Copié !" : "Copier le lien"}
                >
                  {copied ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <DocumentDuplicateIcon className="size-3.5" />
                  )}
                </Button>
              </div>

              <div className="dark:border-dark-500 mt-2.5 flex items-center justify-between border-t border-gray-100 pt-2.5">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 dark:text-primary-400 inline-flex items-center gap-1 text-xs font-medium hover:underline"
                >
                  <ArrowDownTrayIcon className="size-3.5" />
                  Télécharger le fichier
                </a>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-dark-300">
                  <ClockIcon className="size-3.5" />
                  Expire dans 10 min
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
