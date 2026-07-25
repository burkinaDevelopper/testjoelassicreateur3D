// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {
  IdCell,
  TitleCell,
  TypeCell,
  PriceCell,
  ReductionCell,
  CreatedAtCell,
} from "./rows";
import { RowActions } from "./RowActions";
import { type Item } from "./typeData";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper<Item>();
export const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    header: () => <span className="-mx-2">ID</span>,
    cell: IdCell,
  }),
  columnHelper.accessor((row) => row.title, {
    id: "title",
    header: "Titre",
    cell: TitleCell,
  }),
  columnHelper.accessor((row) => row.type, {
    id: "type",
    header: "Type",
    cell: TypeCell,
  }),
  columnHelper.accessor((row) => row.price, {
    id: "price",
    header: "Prix",
    cell: PriceCell,
  }),
  columnHelper.accessor((row) => row.reduction, {
    id: "reduction",
    header: "Réduction",
    cell: ReductionCell,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: "created_at",
    header: "Date de création",
    cell: CreatedAtCell,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: RowActions,
  }),
];
