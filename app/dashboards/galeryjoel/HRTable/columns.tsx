// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";
import { CopyableCell } from "@/components/shared/table/CopyableCell";

// Local Imports
import {
  SelectCell,
  SelectHeader,
} from "@/components/shared/table/SelectCheckbox";
import {
  IdCell,
  TitleCell,
 
  CreatedAtCell,
} from "./rows";
import { RowActions } from "./RowActions";
import { HighlightableCell } from "@/components/shared/table/HighlightableCell";
import { type Item } from "./typeData";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper<Item>();
export const columns = [
  columnHelper.accessor((row) => row.id, {
    id: "id",
    header: () => <span className="-mx-2">ID</span>,
    cell: IdCell,
  }),
  columnHelper.accessor((row) => row.name, {
    id: "title",
    header: "Titre",
    cell: TitleCell,
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
