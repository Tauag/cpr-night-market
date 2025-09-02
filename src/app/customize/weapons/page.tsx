import BaseCustomizePage from "@/components/customize/base-page";
import Table from "./table";

export default function CustomizeWeapons() {
  return (
    <BaseCustomizePage
      title="Weapon Customization"
      description="Customize your Weapons for the Cyberpunk RED TTRPG!"
    >
      <Table />
    </BaseCustomizePage>
  );
}
