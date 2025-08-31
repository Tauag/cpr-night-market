import Link from "next/link";
import UploadJsonButton from "@/components/upload-json-button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 max-w-xl">
        <h1 className="text-4xl font-bold">Night Market Creator</h1>
        <p>
          Create your own Night Market experience for the Cyberpunk RED TTRPG!
          This tool allows you to create and customize your own Cyberpunk RED
          content.
        </p>
        <ol className="font-mono list-inside list-decimal text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by uploading your Night Market JSON file. If you don't
            have one you can download a starter template{" "}
            <Link href="/night_market.json" className="underline" download>
              here
            </Link>
            .
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Note that if you have an existing Night Market the button will ask
            if you want to overwrite the data.
          </li>
          <li className="mb-2 tracking-[-.01em]">
            You can begin customizing your Night Market by section, go to the
            Customize dropdown menu at the top of the page.
          </li>
          <li className="mb-2tracking-[-.01em]">
            Enjoy creating content for your Cyberpunk RED games!
          </li>
        </ol>
        <UploadJsonButton />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm">
          Made with ❤️ by a Cyberpunk RED fan. This is not an official product of
          R. Talstorian Games, please don't sue me bro!
        </p>
      </footer>
    </div>
  );
}
