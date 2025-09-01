interface BasePageProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function BaseCustomizePage({
  children,
  description,
  title,
}: BasePageProps) {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 w-full">
      {title && <h1 className="text-4xl font-bold">{title}</h1>}
      {description && <p>{description}</p>}
      {children}
    </main>
  );
}
