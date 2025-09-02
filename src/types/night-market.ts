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

interface Content extends Entity {
  book_id: string;
  page?: number;
}

interface Book extends Entity {
  abbreviation: string;
  download_link?: string;
}

interface Item extends Content {
  description?: string;
  price: number;
  price_category: PriceCategory;
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

interface MartialArts extends Content {
  description: string;
}

export type { NightMarket, Book, Weapon, Armor, Cyberware, MartialArts };
