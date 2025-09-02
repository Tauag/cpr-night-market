import BaseCustomizePage from "@/components/customize/base-page";
import Table from "./table";

export default function CustomizeDLCs() {
  return (
    <BaseCustomizePage
      title="DLCs and Expansions"
      description="Create DLCs or Expansions to categorize the new items and content you
        create!"
    >
      <Table />
    </BaseCustomizePage>
  );
}
