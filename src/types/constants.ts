import type {
  CyberwareInstallationOptions,
  PriceCategories,
  WeaponTypes,
} from "@/constants/base-constants";

type PriceCategory = (typeof PriceCategories)[number];

type Install = (typeof CyberwareInstallationOptions)[number];

type WeaponType = (typeof WeaponTypes)[number];

export type { PriceCategory, Install, WeaponType };
