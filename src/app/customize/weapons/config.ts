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
    name: "weapon_type",
    label: "Weapon Type",
    className: "md:col-span-1",
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
    name: "single_shot_damage",
    label: "Single Shot Damage",
    className: "md:col-span-1",
    description: "Example: 2d6",
    inputProps: {
      autoComplete: "off",
      required: true,
    },
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
    className: "md:col-span-1",
    inputProps: {
      autoComplete: "off",
      required: true,
      type: "number",
    },
  },
  {
    name: "price_category",
    label: "Price Category",
    className: "md:col-span-1",
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
