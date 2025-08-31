"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function uploadJsonAndStoreToSession(file: File) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const json = event.target?.result;
    if (typeof json === "string") {
      sessionStorage.setItem("nightMarketData", json);
    }
  };
  reader.readAsText(file);
}

export default function UploadJsonButton() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const json = sessionStorage.getItem("nightMarketData");
    if (json) {
      setDataLoaded(true);
    }
  }, []);

  return (
    <Button variant={dataLoaded ? "destructive" : "default"}>
      <label className="cursor-pointer">
        {dataLoaded
          ? "Overwrite Existing Night Market"
          : "Upload Night Market JSON"}
        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              uploadJsonAndStoreToSession(file);
            }
          }}
        />
      </label>
    </Button>
  );
}
