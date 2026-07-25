// Import Dependencies
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Getter, Row, Table } from "@tanstack/react-table"

// Local Imports
import { Avatar, Button } from "@/components/ui";
import { ColorKey, setThisClass } from "@/utils/setThisClass";

import { ensureString } from "@/utils/ensureString";
import dayjs from "dayjs";
;
// ----------------------------------------------------------------------

const statusColors: Record<string, ColorKey> = {
  "full-time": "primary",
  "part-time": "secondary",
  contractor: "info",
  intern: "warning",
  freelance: "success",
};

export function IdCell({
  row,
  getValue,
  table,
}: {
  row: Row<any>;
  getValue: Getter<any>;
  table: Table<any>;
}) {
  const query = ensureString(table.getState().globalFilter);

  return (
    <div className="-mx-2 flex items-center space-x-2">
      {row.getCanExpand() ? (
        <Button
          isIcon
          className="size-5"
          variant="flat"
          onClick={row.getToggleExpandedHandler()}
        >
          <ChevronUpIcon
            className={clsx(
              "size-4 transition-transform",
              row.getIsExpanded() && "rotate-180",
            )}
          />
        </Button>
      ) : null}
      <span>
        {getValue()}
      </span>
    </div>
  );
}

export function TitleCell({
  row,
  getValue,
  table,
}: {
  row: Row<any>;
  getValue: Getter<any>;
  table: Table<any>;
}) {
  const title = getValue();
  const query = ensureString(table.getState().globalFilter);

  return (
    <div className="flex items-center space-x-4">
      <Avatar
        size={9}
        name={title}
        initialColor="auto"
        src={row.original.thumbnail_url}
        classNames={{ initial: "text-xs-plus" }}
      />
      <span className="dark:text-dark-100 font-medium text-gray-800">
        {title}
      </span>
    </div>
  );
}

export function CreatedAtCell({
  getValue,
  table,
}: {
  getValue: Getter<any>;
  table: Table<any>;
}) {
  const query = ensureString(table.getState().globalFilter);


  return (
    <p className="dark:text-dark-100 font-medium text-gray-800">
      {dayjs(getValue()).format("DD/MM/YYYY")}
    </p>
  );
}


