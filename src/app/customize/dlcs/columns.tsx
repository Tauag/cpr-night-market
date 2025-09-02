"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import EditActionsMenu from "@/components/customize/actions-menu";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/night-market";
import { BookSchema } from "@/validator/night-market-schemas";
import { FORM_CONFIG } from "./config";

const columns = (
  remove: (bookId: string) => void,
  editBook?: (book: Book) => void,
): ColumnDef<Book>[] =>
  [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left font-medium ml-3">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "abbreviation",
      header: () => <div className="text-left">Abbreviation</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">
          {row.getValue("abbreviation")}
        </div>
      ),
    },
    {
      accessorKey: "download_link",
      header: () => <div className="text-left">Download Link</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">
          {row.getValue("download_link")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <EditActionsMenu
          row={row}
          onDelete={() => remove(row.original.id)}
          title={`Edit DLC: ${row.original.name}`}
          description="Edit your DLC and save changes."
          formInputs={FORM_CONFIG}
          schema={BookSchema}
          onSubmit={(updated) => {
            console.log("Updated:", updated);
            editBook?.({ ...row.original, ...updated });
          }}
        />
      ),
    },
  ] as ColumnDef<Book>[];

export default columns;
