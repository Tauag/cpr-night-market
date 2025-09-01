"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import type { Book, NightMarket } from "@/types/night-market";
import DLCColumns from "./columns";

export default function DLCTable() {
  const [data, setData] = useState<Book[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [workingBook, setWorkingBook] = useState<Book | null>(null);

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
      <Button variant="outline" className="w-fit" onClick={() => {}}>
        <PlusIcon />
        Add DLC
      </Button>
      <DataTable columns={DLCColumns(removeBook)} data={data} />
    </div>
  );
}
