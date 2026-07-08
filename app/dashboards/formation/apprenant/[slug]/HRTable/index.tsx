'use client';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

// Local Imports
import { CollapsibleSearch } from "@/components/shared/CollapsibleSearch";
import { TableSortIcon } from "@/components/shared/table/TableSortIcon";
import { PaginationSection } from "@/components/shared/table/PaginationSection";
import { SelectedRowsActions } from "@/components/shared/table/SelectedRowsActions";
import {
  Card,
  Collapse,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
} from "@/components/ui";
import { useBoxSize, useDidUpdate } from "@/hooks";
import { fuzzyFilter } from "@/utils/react-table/fuzzyFilter";
import { useSkipper } from "@/utils/react-table/useSkipper";
import { MenuAction } from "./MenuActions";
import { columns } from "./columns";
import { type Item } from "./typeData";
import { getUserAgentBrowser } from "@/utils/dom/getUserAgentBrowser";


// ----------------------------------------------------------------------

const isSafari = getUserAgentBrowser() === "Safari";

// Sous-composant chargé à la demande (quand la ligne est “expand”) pour éviter de charger
// tout le contenu détaillé au premier rendu.
const LazySubRowComponent = dynamic(
  () => import("./SubRowComponent").then((m) => m.SubRowComponent),
  { ssr: false, loading: () => <div className="min-h-px" /> },
);

export function HRTable({usersInChapters}:any) {

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedRowIds = useRef(new Set<string>());

  const { height: theadHeight } = useBoxSize({ ref: theadRef });
  const { width: cardWidth } = useBoxSize({ ref: cardRef });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableData = useMemo(() => usersInChapters ?? [], [usersInChapters]);
  
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,

    getPaginationRowModel: getPaginationRowModel(),

    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [usersInChapters?.length]);
  
  

  return (
    <div>
      <div className="table-toolbar flex items-center justify-between mt-6">
        <h2 className="dark:text-dark-100 truncate text-base font-medium tracking-wide text-gray-800">
          Liste des formations
        </h2>
        <div className="flex">
          <CollapsibleSearch
            placeholder="Search here..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <MenuAction />
        </div>
      </div>
      <Card className="relative mt-3" ref={cardRef}>
        <div className="table-wrapper min-w-full overflow-x-auto">
          <Table hoverable className="w-full text-left rtl:text-right">
            <THead ref={theadRef}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      className="dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg"
                    >
                      {header.column.getCanSort() ? (
                        <div
                          className="flex cursor-pointer items-center space-x-3 select-none"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="flex-1">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </span>
                          <TableSortIcon sorted={header.column.getIsSorted()} />
                        </div>
                      ) : header.isPlaceholder ? null : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </THead>
            <TBody>
              {table?.getRowModel()?.rows.map((row) => {
                return (
                  <Fragment key={row.id}>
                    <Tr
                      className={clsx(
                        "dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200",
                        row.getIsSelected() &&
                          !isSafari &&
                          "row-selected after:bg-primary-500/10 ltr:after:border-l-primary-500 rtl:after:border-r-primary-500 after:pointer-events-none after:absolute after:inset-0 after:z-2 after:h-full after:w-full after:border-3 after:border-transparent",
                        row.getIsExpanded() && "border-dashed",
                      )}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                    <tr>
                      <td
                        colSpan={row.getVisibleCells().length}
                        className="p-0"
                      >
                         <Collapse in={row.getIsExpanded()}>
                          {(() => {
                            if (row.getIsExpanded()) expandedRowIds.current.add(row.id);
                            return expandedRowIds.current.has(row.id) ? (
                              <LazySubRowComponent row={row} cardWidth={cardWidth} />
                            ) : null;
                          })()}
                        </Collapse>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </TBody>
          </Table>
        </div>
        {table.getCoreRowModel().rows.length > 0 && (
          <div className="p-4 sm:px-5">
            <PaginationSection table={table} />
          </div>
        )}{" "}
        <SelectedRowsActions table={table} height={theadHeight} />
      </Card>
    </div>
  );
}
