import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { getNightMarketData } from "@/lib/manage-night-market";
import type { Book } from "@/types/night-market";

const useBookData = (): [Book[], Dispatch<SetStateAction<Book[]>>] => {
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    const nightMarketData = getNightMarketData();
    setData(nightMarketData.books);
  }, []);

  return [data, setData] as const;
};

export { useBookData };
