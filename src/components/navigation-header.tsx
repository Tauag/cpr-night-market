import Link from "next/link";
import DarkmodeToggle from "./darkmode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

const CUSTOMIZE_OPTIONS = [
  {
    title: "DLCs",
    href: "/customize/dlcs",
    description: "Create your own DLCs for this Night Market!",
  },
  {
    title: "Weapons",
    href: "/customize/weapons",
    description: "Customize the weapons available for this Night Market!",
  },
] as const;

export default function NavigationHeader() {
  return (
    <header className="p-2 flex items-center justify-between">
      <NavigationMenu className="list-none gap-2 flex items-center">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Customize</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {CUSTOMIZE_OPTIONS.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="https://github.com/Tauag/cpr-night-market">Github</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
      <DarkmodeToggle />
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );

  