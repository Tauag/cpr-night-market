"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { parseAndValidateNightMarket } from "@/lib/manage-night-market";
import { Button } from "./ui/button";

export default function UploadJsonButton() {
  const router = useRouter();
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cancel redirect if component unmounts
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.removeItem("nightMarketData");

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const json = e.target?.result;
        if (
          typeof json === "string" &&
          parseAndValidateNightMarket(json) !== null
        ) {
          localStorage.setItem("nightMarketData", json);
          toast.success("Night Market Data Uploaded!", {
            description:
              "You will be redirected to the DLC customization page in shortly...",
          });
          redirectTimeoutRef.current = setTimeout(() => {
            router.push("/customize/dlcs");
          }, 5000);
        } else {
          toast.error("Night Market Data Error", {
            description:
              "Something went wrong with your Night Market data choom. Make sure you're uploading the right file and that you only make edits to it with this tool.",
          });
        }
      };
      reader.onerror = () => {
        toast.error("Failed to upload Night Market Data");
      };
      reader.readAsText(file);
    }

    // Reset file input so it works more than once
    event.target.value = "";
  };

  return (
    <Button className="p-0">
      <label className="cursor-pointer w-full h-full leading-9">
        Upload Night Market JSON File
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
