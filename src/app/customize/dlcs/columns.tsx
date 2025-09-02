"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Book } from "@/types/night-market";

const columns = (removeBookFn: (bookId: string) => void) =>
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
      cell: ({ row }) => {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.name)}
              >
                Copy DLC Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.abbreviation)}
              >
                Copy DLC Abbreviation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (data.download_link) {
                    navigator.clipboard.writeText(data.download_link);
                  }
                }}
              >
                Copy Download Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => removeBookFn(data.id)}>
                Delete DLC
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ] as ColumnDef<Book>[];

export default columns;
