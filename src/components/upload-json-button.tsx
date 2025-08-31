"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseAndValidateNightMarket } from "@/validator/night-market-validator";
import { Button } from "./ui/button";

export default function UploadJsonButton() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const json = sessionStorage.getItem("nightMarketData");
    if (json) {
      setDataLoaded(true);
    }
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    sessionStorage.removeItem("nightMarketData");
    setDataLoaded(false);

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const json = e.target?.result;
        if (
          typeof json === "string" &&
          parseAndValidateNightMarket(json) !== null
        ) {
          sessionStorage.setItem("nightMarketData", json);
          setDataLoaded(true);
          toast.success("Night Market Data Uploaded!");
        } else {
          toast.error("Night Market Data Error", {
            description:
              "Something went wrong with your Night Market data choom. Make sure you're uploading the right file and that you only make edits to it with this tool.",
          });
        }
        setLoading(false);
      };
      reader.onerror = () => {
        toast.error("Failed to upload Night Market Data");
        setLoading(false);
      };
      reader.readAsText(file);
    }

    // Reset file input so it works more than once
    event.target.value = "";
  };

  return (
    <Button
      className="p-0"
      variant={dataLoaded ? "destructive" : "default"}
      disabled={loading}
    >
      <label className="cursor-pointer w-full h-full leading-9">
        {loading
          ? "Uploading..."
          : dataLoaded
            ? "Overwrite Existing Night Market"
            : "Upload Night Market JSON"}
        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </Button>
  );
}
