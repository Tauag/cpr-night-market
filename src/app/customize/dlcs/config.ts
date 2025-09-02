import type { FormInput } from "@/components/customize/dialog-form";

const FORM_CONFIG: FormInput[] = [
  {
    name: "name",
    label: "DLC Name",
    description: "This is the name of your DLC.",
    inputProps: {
      autoComplete: "off",
      required: true,
    },
  },
  {
    name: "abbreviation",
    label: "Abbreviation",
    description:
      "This is the abbreviation that will be used to tag content made under this DLC.",
    inputProps: {
      autoComplete: "off",
      required: true,
    },
  },
  {
    name: "download_link",
    label: "Download Link",
    description: "If the DLC is available for download, provide the link here.",
    inputProps: {
      autoComplete: "off",
    },
  },
];

export { FORM_CONFIG };
