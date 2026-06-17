// Import Dependencies
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { FaTwitter } from "react-icons/fa";

// Local Imports
import { Badge } from "@/components/ui";
import { colorFromText } from "@/utils/colorFromText";
import { Row } from "@tanstack/react-table";
import { type Item } from "./typeData";

// ----------------------------------------------------------------------

export function SubRowComponent({
  row,
  cardWidth,
}: {
  row: Row<Item>;
  cardWidth?: number;
}) {
  return (
    <div
      className="dark:border-b-dark-500 dark:bg-dark-750 sticky border-b border-b-gray-200 bg-gray-50 pt-3 pb-4 ltr:left-0 rtl:right-0"
      style={{ maxWidth: cardWidth }}
    >
      <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-3">
        <div>
          <p className="font-medium">Durée:</p>
          <div className="mt-3 flex max-w-xs flex-wrap gap-2">
           
             <Badge
                  
                className="capitalize"
                variant="soft"
              >
                {row.original?.duration? row.original.duration : "0h"}
              </Badge>
          </div>
        </div>
        <div>
          <p className="font-medium">description:</p>
          <div className="mt-3 space-y-2">
           <img src={row.original?.url} alt="logo" className="w-60 h-30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
