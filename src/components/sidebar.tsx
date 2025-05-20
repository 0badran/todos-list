"use client";
import { useSidebarState } from "@/zustand/sidebar-state";
import clsx from "clsx";
import { Grid, Timer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, DrawerContent } from "./ui/drawer";

const links = [
  {
    name: "My Todo List",
    href: "/todo",
    icon: Grid
  },
  {

    name: "Coming Soon",
    href: "/coming-soon",
    icon: Timer
  }
];

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarState();
  const pathname = usePathname();

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-screen w-96 dark:bg-gray-800">
        {
          links.map((link) => {
            const LinkIcon = link.icon;
            return <Link key={link.name} href={link.href}>
              <div onClick={() => setIsOpen(false)} className={clsx(`p-3 flex items-center gap-2 rounded`, {
                "bg-sky-100 text-sky-600": pathname === link.href || pathname.startsWith(`${link.href}/`)
              })}>
                <LinkIcon size={"1.5em"} className="text-sky-400" /> <span>{link.name}</span>
              </div>
            </Link>
          })
        }
      </DrawerContent>
    </Drawer>
  )
}