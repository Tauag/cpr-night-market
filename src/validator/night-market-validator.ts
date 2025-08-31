import { z } from "zod";
import type { NightMarket } from "@/types/night-market";

const BookSchema = z.object({
  name: z.string(),
  abbreviation: z.string(),
});

const SourceSchema = z.object({
  book: BookSchema,
  page: z.number().optional(),
});

const ItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  price_category: z.string(), // Adjust if you have an enum
  source: SourceSchema.optional(),
});

const WeaponSchema = ItemSchema.extend({
  damage: z.string(),
  weapon_type: z.string(), // Adjust if you have an enum
  exotic: z.boolean(),
});

const ArmorSchema = ItemSchema.extend({
  stopping_power: z.number(),
});

const CyberwareSchema = ItemSchema.extend({
  install: z.string(), // Adjust if you have an enum
  humanity_loss: z.number(),
});

const MartialArtsSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const NightMarketSchema = z.object({
  books: z.array(BookSchema),
  items: z.object({
    weapons: z.array(WeaponSchema),
    armor: z.array(ArmorSchema),
    cyberware: z.array(CyberwareSchema),
  }),
  martial_arts: z.array(MartialArtsSchema),
});

function parseAndValidateNightMarket(json: string): NightMarket | null {
  try {
    const data = JSON.parse(json);
    return NightMarketSchema.parse(data) as NightMarket;
  } catch (error) {
    console.error("Validation failed:", error);
    return null;
  }
}

export {
  BookSchema,
  SourceSchema,
  ItemSchema,
  WeaponSchema,
  ArmorSchema,
  CyberwareSchema,
  MartialArtsSchema,
  NightMarketSchema,
  parseAndValidateNightMarket,
};
