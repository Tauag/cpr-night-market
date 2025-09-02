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

const ContentSchema = EntitySchema.extend({
  book_id: z.string(),
  page: z.coerce.number().min(1).optional(),
});

const ItemSchema = ContentSchema.extend({
  description: z.string(),
  price: z.coerce.number(),
  price_category: z.enum(PriceCategories),
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

const MartialArtsSchema = ContentSchema.extend({
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
  ItemSchema,
  WeaponSchema,
  ArmorSchema,
  CyberwareSchema,
  MartialArtsSchema,
  NightMarketSchema,
};
