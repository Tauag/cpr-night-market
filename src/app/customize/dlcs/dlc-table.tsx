"use client";

import { useEffect } from "react";
import DataTable from "@/components/customize/data-table";
import DialogForm from "@/components/customize/dialog-form";
import { useBookData } from "@/hooks/useNightMarketData";
import {
  getNightMarketData,
  setNightMarketData,
} from "@/lib/manage-night-market";
import type { Book } from "@/types/night-market";
import { BookSchema } from "@/validator/night-market-schemas";
import DLCColumns from "./columns";
import { FORM_CONFIG } from "./config";

export default function DLCTable() {
  const [data, setData] = useBookData();

  useEffect(() => {
    // Update book data in session storage when data changes, debounced.
    const timeout = setTimeout(() => {
      const nightMarketData = getNightMarketData();
      nightMarketData.books = data;
      setNightMarketData(nightMarketData);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data]);

  const addBook = (newData: Record<string, string | number>) => {
    const newBook = newData as unknown as Book;
    newBook.id = crypto.randomUUID();
    setData([...data, newBook as unknown as Book]);
  };

  const removeBook = (bookId: string) => {
    setData(data.filter((book) => book.id !== bookId));
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <DataTable
        columns={DLCColumns(removeBook)}
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
