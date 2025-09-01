import { GitCompareIcon } from "lucide-react";
import Link from "next/link";
import DarkmodeToggle from "../darkmode-toggle";
import SaveMarketButton from "../save-market-button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import CustomizationsList from "./customizations-list";

export const HEADER_HEIGHT = "52px";

export default function NavigationHeader() {
  return (
    <header className="p-2 flex items-center justify-between position-fixed w-full">
      <NavigationMenu className="list-none gap-2 flex items-center">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Customize</NavigationMenuTrigger>
          <NavigationMenuContent>
            <CustomizationsList />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              className="flex-row items-center gap-2"
              href="https://github.com/Tauag/cpr-night-market"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitCompareIcon />
              Github
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
      <div className="flex items-center">
        <SaveMarketButton />
        <DarkmodeToggle />
      </div>
    </header>
  );
}
