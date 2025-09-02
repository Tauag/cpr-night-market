import BaseNightMarket from "@/constants/base-night-market";
import type { NightMarket } from "@/types/night-market";
import { NightMarketSchema } from "@/validator/night-market-schemas";

function parseAndValidateNightMarket(json: string): NightMarket | null {
  try {
    const data = JSON.parse(json);
    return NightMarketSchema.parse(data) as NightMarket;
  } catch (error) {
    console.error("Validation failed:", error);
    return null;
  }
}

function setNightMarketData(data: NightMarket) {
  localStorage.setItem("nightMarketData", JSON.stringify(data));
}

function getNightMarketData(): NightMarket {
  const storedData = localStorage.getItem("nightMarketData");
  if (storedData) {
    const parsedData = parseAndValidateNightMarket(storedData);
    if (parsedData) {
      return parsedData;
    } else {
      // If the data is invalid override the session storage
      setNightMarketData(BaseNightMarket);
    }
  } else {
    // If the data does not exist also set the default data
    setNightMarketData(BaseNightMarket);
  }
  return BaseNightMarket;
}

export { getNightMarketData, setNightMarketData, parseAndValidateNightMarket };
