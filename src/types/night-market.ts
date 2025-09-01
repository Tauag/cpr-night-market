import type { Install, PriceCategory, WeaponType } from "./constants";

interface NightMarket {
  books: Book[];
  items: {
    weapons: Weapon[];
    armor: Armor[];
    cyberware: Cyberware[];
  };
  martial_arts: MartialArts[];
}

interface Book {
  id: string;
  name: string;
  abbreviation: string;
  download_link?: string;
}

interface Source {
  book: Book;
  page?: number;
}

interface Item {
  name: string;
  description?: string;
  price: number;
  price_category: PriceCategory;
  source?: Source;
}

interface Weapon extends Item {
  damage: string;
  weapon_type: WeaponType;
  exotic: boolean;
}

interface Armor extends Item {
  stopping_power: number;
}

interface Cyberware extends Item {
  install: Install;
  humanity_loss: number;
}

interface MartialArts {
  name: string;
  description?: string;
}

export type { NightMarket, Book, Weapon, Armor, Cyberware };
