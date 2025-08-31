"use client";

import { Button } from "./ui/button";

export default function SaveMarketButton() {
  // Save button handler
  function handleSave() {
    const data = sessionStorage.getItem("nightMarketData");
    if (!data) return;
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "night-market.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Button className="mr-2" onClick={handleSave} variant="secondary">
      Save
    </Button>
  );
}
