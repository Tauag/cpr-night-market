import Link from "next/link";
import UploadJsonButton from "@/components/upload-json-button";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 max-w-xl">
      <h1 className="text-4xl font-bold">Night Market Creator</h1>
      <p>
        Create your own Night Market experience for the{" "}
        <b>Cyberpunk RED TTRPG</b>! This tool allows you to create, customize
        and share your own <b>Cyberpunk RED </b> content. I have also included
        handy filtering and sorting capabilities to help you find what you need
        quickly.
      </p>
      <ol className="font-mono list-inside list-decimal text-sm/6 sm:text-left">
        <li className="mb-2 tracking-[-.01em]">
          Get started by uploading your Night Market JSON file. If you don't
          have one you can download a starter template{" "}
          <Link href="/night-market.json" className="underline" download>
            here
          </Link>
          .
        </li>
        <li className="mb-2 tracking-[-.01em]">
          Note that if this is not your first time using the Night Market
          Creator tool you may already have data loaded!
        </li>
        <li className="mb-2 tracking-[-.01em]">
          You can begin customizing your Night Market by section, go to the
          Customize dropdown menu at the top of the page. I recommend you start
          with the DLCs section.
        </li>
        <li className="mb-2 tracking-[-.01em]">
          It is a good idea to regularly save your changes.
        </li>
        <li className="mb-2tracking-[-.01em]">
          Enjoy creating content for your Cyberpunk RED games!
        </li>
      </ol>
      <UploadJsonButton />
    </main>
  );
}
