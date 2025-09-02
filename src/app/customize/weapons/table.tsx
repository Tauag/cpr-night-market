"use client";

import DataTable from "@/components/customize/data-table";
import DialogForm from "@/components/customize/dialog-form";
import { PriceCategories } from "@/constants/base-constants";
import { useBookData, useWeaponData } from "@/hooks/useNightMarketData";
import type { Weapon } from "@/types/night-market";
import { WeaponSchema } from "@/validator/night-market-schemas";
import DLCColumns from "./columns";
import { getFormConfig } from "./config";

export default function Table() {
  const [data, setData] = useWeaponData();
  const [bookData, _] = useBookData();

  const addWeapon = (newData: Record<string, string | number>) => {
    const newWeapon = newData as unknown as Weapon;
    newWeapon.id = crypto.randomUUID();
    setData([...data, newWeapon as unknown as Weapon]);
  };

  const removeWeapon = (weaponId: string) => {
    setData(data.filter((weapon) => weapon.id !== weaponId));
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <DataTable
        columns={DLCColumns(removeWeapon, bookData)}
        data={data}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        addDataButton={
          <DialogForm
            title="New Weapons"
            description="Create your weapon here, click save when you're done."
            triggerButtonText="Add Weapon"
            formInputs={getFormConfig(bookData)}
            schema={WeaponSchema}
            defaultValues={{
              id: "",
              name: "",
              single_shot_damage: "",
              weapon_type: "",
              description: "",
              price: 0,
              price_category: PriceCategories[0],
            }}
            onSubmit={addWeapon}
          />
        }
      />
    </div>
  );
}
