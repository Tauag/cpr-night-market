import { z } from "zod";
import {
  CyberwareInstallationOptions,
  PriceCategories,
  WeaponTypes,
} from "@/constants/base-constants";

const EntitySchema = z.object({
  id: z.string(),
  name: z.string(),
});

const BookSchema = EntitySchema.extend({
  abbreviation: z.string(),
  download_link: z.string().optional(),
});

const SourceSchema = z.object({
  book: BookSchema,
  page: z.number().optional(),
});

const ItemSchema = EntitySchema.extend({
  description: z.string(),
  price: z.number(),
  price_category: z.enum(PriceCategories),
  source: SourceSchema.optional(),
});

const WeaponSchema = ItemSchema.extend({
  single_shot_damage: z.string(),
  weapon_type: z.enum(WeaponTypes),
});

const ArmorSchema = ItemSchema.extend({
  stopping_power: z.number(),
});

const CyberwareSchema = ItemSchema.extend({
  install: z.enum(CyberwareInstallationOptions),
  humanity_loss: z.number(),
});

const MartialArtsSchema = EntitySchema.extend({
  description: z.string(),
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

export {
  BookSchema,
  SourceSchema,
  ItemSchema,
  WeaponSchema,
  ArmorSchema,
  CyberwareSchema,
  MartialArtsSchema,
  NightMarketSchema,
};
