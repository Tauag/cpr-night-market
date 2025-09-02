"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/customize/data-table";
import DialogForm from "@/components/customize/dialog-form";
import type { Book, NightMarket } from "@/types/night-market";
import { BookSchema } from "@/validator/night-market-validator";
import DLCColumns from "./columns";
import { FORM_CONFIG } from "./config";

export default function DLCTable() {
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    // Fetch Book data from session storage
    const storedData = sessionStorage.getItem("nightMarketData");
    if (storedData) {
      setData(JSON.parse(storedData).books);
    }
  }, []);

  useEffect(() => {
    // Update book data in session storage when data changes, debounced.
    const timeout = setTimeout(() => {
      const storedData = sessionStorage.getItem("nightMarketData");
      if (storedData) {
        const nightMarketData = JSON.parse(storedData) as NightMarket;
        nightMarketData.books = data;
        sessionStorage.setItem(
          "nightMarketData",
          JSON.stringify(nightMarketData),
        );
      }
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
