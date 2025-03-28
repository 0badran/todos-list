"use client";
import { useSidebarState } from "@/context/sidebar-state";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Timer, List } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

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
      <DrawerTrigger asChild>
        <List />
      </DrawerTrigger>
      <DrawerContent className="h-screen w-90 dark:bg-gray-800">
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