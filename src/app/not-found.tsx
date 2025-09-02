import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-screen my-32">
      <h1 className="text-6xl font-bold">404</h1>
      <Image
        src="/images/maelstrom.webp"
        alt="Maelstrom"
        width={500}
        height={300}
      />
      <p className="mt-4 text-lg max-w-md text-center">
        Hey you're in the wrong place choom, I'd skedaddle if I were you.
        Maelstrom don't take kindly to outsiders around here.
      </p>
    </div>
  );
}
