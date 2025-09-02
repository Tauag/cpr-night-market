"use client";

import DataTable from "@/components/customize/data-table";
import DialogForm from "@/components/customize/dialog-form";
import { useBookData } from "@/hooks/useNightMarketData";
import type { Book } from "@/types/night-market";
import { BookSchema } from "@/validator/night-market-schemas";
import DLCColumns from "./columns";
import { FORM_CONFIG } from "./config";

export default function Table() {
  const [data, setData] = useBookData();

  const addBook = (newData: Record<string, string | number>) => {
    const newBook = newData as unknown as Book;
    newBook.id = crypto.randomUUID();
    setData([...data, newBook as unknown as Book]);
  };

  const removeBook = (bookId: string) => {
    setData(data.filter((book) => book.id !== bookId));
  };

  const editBook = (updated: Book) => {
    setData(data.map((book) => (book.id === updated.id ? updated : book)));
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <DataTable
        columns={DLCColumns(removeBook, editBook)}
        data={data}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        addDataButton={
          <DialogForm
            title="New DLC"
            description="Create your DLC here, click save when you're done."
            triggerButtonText="Add DLC"
            formInputs={FORM_CONFIG}
            schema={BookSchema}
            defaultValues={{
              id: "",
              name: "",
              abbreviation: "",
              download_link: "",
            }}
            onSubmit={addBook}
          />
        }
      />
    </div>
  );
}
