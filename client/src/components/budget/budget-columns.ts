import { ColumnDef } from "@tanstack/react-table";
import { ExpenseTableRow } from "@/types/Expense";

export const budgetColumns: ColumnDef<ExpenseTableRow>[] = [
  {
    accessorKey: "name",
    header: "Expense",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "payer",
    header: "Paid by",
  },
];
