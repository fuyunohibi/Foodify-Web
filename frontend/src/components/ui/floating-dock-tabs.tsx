import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";

export function FloatingDockTabs() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/home",
    },

    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "Write a recipe",
      icon: (
        <IconPencil className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/add-recipe",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[12rem] w-full ">
      <FloatingDock
        mobileClassName="translate-y-10 translate-x-40" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
