"use client";

import { leftSidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { checkRouteMatch } from "@/utils";
import Image from "next/image";
import { cn } from "@/utils/cn";

const LeftSidebar = () => {
  const path = usePathname();

  return (
    <div
      className="
           h-full flex flex-col justify-between items-between py-4 w-24 
          "
    >
      {/* LOGO */}
      <div className="flex flex-col justify-center items-center">
        <Link
          href="/"
          className="flex justify-center items-center bg-secondary-100 rounded-full w-[4.75rem] h-[4.75rem]"
        >
            <h1 className="text-xl font-bold text-primary-200">Taste.</h1>
        </Link>
      </div>
      {/* TABS */}
      <div className="bg-white flex flex-col justify-between items-center space-y-4 rounded-[64px] py-4">
        {leftSidebarLinks.map((link) => (
          <div
            key={link.route}
            className={cn(
              "flex flex-col justify-center items-center  w-16 h-16 rounded-[3rem] hover:bg-primary-200  transition-colors duration-300",
              {
                "bg-primary-200": checkRouteMatch(path, link.route),
              }
            )}
          >
            <Link href={link.route}>
              <Image
                src={`assets/icons/sidebar/${link.icon}.svg`}
                width={32}
                height={32}
                alt={link.label}
                className="w-6 h-6"
              />
              {/* <p className="text-sm font-semibold">{link.label}</p> */}
            </Link>
          </div>
        ))}
      </div>
      {/* USER TAB */}
      <div className="flex flex-col justify-center items-center">
        <div className="bg-primary rounded-full w-[4rem] h-[4rem]">
          <Link href="/profile" className="flex justify-start items-center">
            <Image
              src="/assets/images/avatars/gordon.webp"
              width="64"
              height="64"
              alt="profile picture"
              className="w-[4rem] h-[4rem] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
