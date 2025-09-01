import DLCTable from "./dlc-table";

export default function CustomizeDLCs() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 w-full">
      <h1 className="text-4xl font-bold">DLCs and Expansions</h1>
      <p>
        Create DLCs or Expansions to categorize the new items and content you
        create!
      </p>
      <DLCTable />
    </main>
  );
}
