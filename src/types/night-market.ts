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

interface Entity {
  id: string;
  name: string;
}

interface Book extends Entity {
  abbreviation: string;
  download_link?: string;
}

interface Source {
  book_id: string;
  page?: number;
}

interface Item extends Entity {
  description?: string;
  price: number;
  price_category: PriceCategory;
  source?: Source;
}

interface Weapon extends Item {
  single_shot_damage: string;
  weapon_type: WeaponType;
}

interface Armor extends Item {
  stopping_power: number;
}

interface Cyberware extends Item {
  install: Install;
  humanity_loss: number;
}

interface MartialArts extends Entity {
  description: string;
}

export type {
  NightMarket,
  Source,
  Book,
  Weapon,
  Armor,
  Cyberware,
  MartialArts,
};
