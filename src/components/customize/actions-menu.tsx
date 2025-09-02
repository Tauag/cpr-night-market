import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import type { AnyZodObject } from "zod";
import DialogForm, { type FormInput } from "@/components/customize/dialog-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditActionsMenuProps<T> {
  row: Row<T>;
  onDelete: () => void;
  title: string;
  description: string;
  formInputs: FormInput[];
  schema: AnyZodObject;
  onSubmit: (data: Record<string, string | number>) => void;
}

export default function EditActionsMenu<T>({
  row,
  onDelete,
  title,
  description,
  formInputs,
  schema,
  onSubmit,
}: EditActionsMenuProps<T>) {
  const data = row.original;
  const [editOpen, setEditOpen] = useState(false);

  const handleSubmit = (updated: Record<string, string | number>) => {
    setEditOpen(false);
    onSubmit(updated);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {editOpen && (
        <DialogForm
          title={title}
          description={description}
          formInputs={formInputs}
          schema={schema}
          defaultValues={data as unknown as Record<string, string | number>}
          onSubmit={handleSubmit}
          defaultOpen
          showButton={false}
        />
      )}
    </>
  );
}
