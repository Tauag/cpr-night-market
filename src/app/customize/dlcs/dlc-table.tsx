"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "@/components/customize/data-table";
import type { Book, NightMarket } from "@/types/night-market";
import DLCColumns from "./columns";
import DialogForm from "./dialog-form";

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

  const addBook = (newBook: Book) => {
    setData([...data, newBook]);
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
          <DialogForm onSubmit={addBook}>
            <PlusIcon />
            Add DLC
          </DialogForm>
        }
      />
    </div>
  );
}
