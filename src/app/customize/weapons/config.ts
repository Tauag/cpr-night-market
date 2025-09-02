import type { FormInput } from "@/components/customize/dialog-form";
import { PriceCategories, WeaponTypes } from "@/constants/base-constants";
import type { Book } from "@/types/night-market";

const FORM_CONFIG: FormInput[] = [
  {
    name: "name",
    label: "Name",
    inputProps: {
      autoComplete: "off",
      required: true,
    },
  },
  {
    name: "single_shot_damage",
    label: "Single Shot Damage",
    description:
      "This is the damage dealt by a single shot from this weapon (Example: 2d6).",
    inputProps: {
      autoComplete: "off",
      required: true,
    },
  },
  {
    name: "weapon_type",
    label: "Weapon Type",
    selectProps: {
      required: true,
    },
    select: true,
    selectOptions: WeaponTypes.map((type) => ({
      value: type,
      label: type,
    })),
    selectPlaceholder: "Select a weapon type",
  },
  {
    name: "description",
    label: "Description",
    textarea: true,
    textAreaProps: {
      autoComplete: "off",
      required: true,
    },
  },
  {
    name: "price",
    label: "Price",
    inputProps: {
      autoComplete: "off",
      required: true,
      type: "number",
    },
  },
  {
    name: "price_category",
    label: "Price Category",
    selectProps: {
      required: true,
    },
    select: true,
    selectOptions: PriceCategories.map((category) => ({
      value: category,
      label: category,
    })),
    selectPlaceholder: "Select a price category",
  },
];

function getFormConfig(books: Book[]): FormInput[] {
  return [
    ...FORM_CONFIG,
    {
      name: "book_id",
      label: "Source",
      selectProps: {
        autoComplete: "off",
      },
      select: true,
      selectOptions: books.map((book) => ({
        value: book.id,
        label: book.name,
      })),
      selectPlaceholder: "Select a source",
    },
  ];
}

export { FORM_CONFIG, getFormConfig };
