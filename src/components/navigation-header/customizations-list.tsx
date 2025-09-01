"use client";

import ListItem from "./list-item";

const CUSTOMIZE_OPTIONS = [
  {
    title: "DLCs & Expansions",
    href: "/customize/dlcs",
    description: "Create your own DLCs for this Night Market.",
  },
  {
    title: "Weapons",
    href: "/customize/weapons",
    description: "Customize your weapons room before the gig.",
  },
  {
    title: "Armor",
    href: "/customize/armor",
    description: "Only the best armor for your Night Market!",
  },
  {
    title: "Ammo",
    href: "/customize/ammo",
    description: "Sometimes the hollow points are just not enough.",
  },
  {
    title: "Martial Arts",
    href: "/customize/martial-arts",
    description: "Create your own unique martial arts styles.",
  },
] as const;

export default function CustomizationsList() {
  return (
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
  );
}
