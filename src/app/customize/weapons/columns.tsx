"use client";

import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import EditActionsMenu from "@/components/customize/actions-menu";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import type { Book, Weapon } from "@/types/night-market";
import { WeaponSchema } from "@/validator/night-market-schemas";
import { getFormConfig } from "./config";

const columns = (
  remove: (id: string) => void,
  books: Book[],
  editWeapon?: (weapon: Weapon) => void,
): ColumnDef<Weapon>[] =>
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
      accessorKey: "single_shot_damage",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Damage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left font-medium">
          {row.getValue("single_shot_damage")}
        </div>
      ),
    },
    {
      accessorKey: "weapon_type",
      header: () => <div className="text-left">Weapon Type</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium">
          {row.getValue("weapon_type")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="text-left">Description</div>,
      cell: ({ row }) => (
        <div className="text-left font-medium overflow-scroll">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "price",
      accessorFn: (row) => `${row.price} (${row.price_category})`,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "book_id",
      accessorFn: (row) => {
        const book = books.find((book) => book.id === row.book_id);
        return { book, page: row.page };
      },
      header: () => <div className="text-left">Source</div>,
      cell: ({ row }) => {
        const { book, page } = row.getValue("book_id") as {
          book: Book | undefined;
          page: number | undefined;
        };
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-left font-medium">
                  {book ? `${book.abbreviation} ${page || ""}` : ""}
                </div>
              </TooltipTrigger>
              {book && (
                <TooltipContent>
                  <p className="font-bold text-base">{book.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <EditActionsMenu
          row={row}
          onDelete={() => remove(row.original.id)}
          title={`Edit Weapon: ${row.original.name}`}
          description="Edit your weapon and save changes."
          formInputs={getFormConfig(books)}
          schema={WeaponSchema}
          onSubmit={(updated) => {
            editWeapon?.({ ...row.original, ...updated });
          }}
        />
      ),
    },
  ] as ColumnDef<Weapon>[];

export default columns;
