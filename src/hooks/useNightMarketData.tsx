import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import {
  getNightMarketData,
  setNightMarketData,
} from "@/lib/manage-night-market";
import type { Armor, Book, Cyberware, Weapon } from "@/types/night-market";

const DEFAULT_DEBOUNCE_TIME = 1000 as const;

const useBookData = (): [Book[], Dispatch<SetStateAction<Book[]>>] => {
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    const nightMarketData = getNightMarketData();
    setData(nightMarketData.books);
  }, []);

  useEffect(() => {
    // Debounce saving book data to session storage on data changes.
    const timeout = setTimeout(() => {
      const nightMarketData = getNightMarketData();
      nightMarketData.books = data;
      setNightMarketData(nightMarketData);
    }, DEFAULT_DEBOUNCE_TIME);

    return () => clearTimeout(timeout);
  }, [data]);

  return [data, setData] as const;
};

const useWeaponData = (): [Weapon[], Dispatch<SetStateAction<Weapon[]>>] => {
  const [data, setData] = useState<Weapon[]>([]);

  useEffect(() => {
    const nightMarketData = getNightMarketData();
    setData(nightMarketData.items.weapons);
  }, []);

  useEffect(() => {
    // Debounce saving weapon data to session storage on data changes.
    const timeout = setTimeout(() => {
      const nightMarketData = getNightMarketData();
      nightMarketData.items.weapons = data;
      setNightMarketData(nightMarketData);
    }, DEFAULT_DEBOUNCE_TIME);

    return () => clearTimeout(timeout);
  }, [data]);

  return [data, setData] as const;
};

const useArmorData = (): [Armor[], Dispatch<SetStateAction<Armor[]>>] => {
  const [data, setData] = useState<Armor[]>([]);

  useEffect(() => {
    const nightMarketData = getNightMarketData();
    setData(nightMarketData.items.armor);
  }, []);

  useEffect(() => {
    // Debounce saving armor data to session storage on data changes.
    const timeout = setTimeout(() => {
      const nightMarketData = getNightMarketData();
      nightMarketData.items.armor = data;
      setNightMarketData(nightMarketData);
    }, DEFAULT_DEBOUNCE_TIME);

    return () => clearTimeout(timeout);
  }, [data]);

  return [data, setData] as const;
};

const useCyberwareData = (): [
  Cyberware[],
  Dispatch<SetStateAction<Cyberware[]>>,
] => {
  const [data, setData] = useState<Cyberware[]>([]);

  useEffect(() => {
    const nightMarketData = getNightMarketData();
    setData(nightMarketData.items.cyberware);
  }, []);

  useEffect(() => {
    // Debounce saving cyberware data to session storage on data changes.
    const timeout = setTimeout(() => {
      const nightMarketData = getNightMarketData();
      nightMarketData.items.cyberware = data;
      setNightMarketData(nightMarketData);
    }, DEFAULT_DEBOUNCE_TIME);

    return () => clearTimeout(timeout);
  }, [data]);

  return [data, setData] as const;
};

export { useBookData, useWeaponData, useArmorData, useCyberwareData };
