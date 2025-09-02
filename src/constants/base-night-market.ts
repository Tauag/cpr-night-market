import type { NightMarket } from "@/types/night-market";

const BaseNightMarket: NightMarket = {
  books: [],
  items: {
    weapons: [],
    armor: [],
    cyberware: [],
  },
  martial_arts: [],
} as const;

export default BaseNightMarket;
