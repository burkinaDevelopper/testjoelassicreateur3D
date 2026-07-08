// Import Dependencies
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Getter, Row, Table } from "@tanstack/react-table"

// Local Imports
import { Avatar, Button } from "@/components/ui";
import { ColorKey, setThisClass } from "@/utils/setThisClass";
import { Highlight } from "@/components/shared/Highlight";
import { ensureString } from "@/utils/ensureString";
import moment from "moment";
moment.locale('fr');

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
        <Highlight query={query}>{getValue()}</Highlight>
      </span>
    </div>
  );
}

export function FirstNameCell({
  row,
  getValue,
  table,
}: {
  row: Row<any>;
  getValue: Getter<any>;
  table: Table<any>;
}) {
  const firtname = getValue();
  const query = ensureString(table.getState().globalFilter);

  return (
    <div className="flex items-center space-x-4">
   
      <span className="dark:text-dark-100 font-medium text-gray-800">
        <Highlight query={query}>{firtname}</Highlight>
      </span>
    </div>
  );
}

export function LastNameCell({
  row,
  getValue,
  table,
}: {
  row: Row<any>;
  getValue: Getter<any>;
  table: Table<any>;
}) {
  const lastname = getValue();
  const query = ensureString(table.getState().globalFilter);

  return (
    <div className="flex items-center space-x-4">
   
      <span className="dark:text-dark-100 font-medium text-gray-800">
        <Highlight query={query}>{lastname}</Highlight>
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
      <Highlight query={query}>{moment(getValue()).fromNow()}</Highlight>
    </p>
  );
}


