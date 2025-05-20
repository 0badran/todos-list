"use client";
import { useSidebarState } from "@/zustand/sidebar-state";
import { UserButton } from "@stackframe/stack";
import { Home, List } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./mode-toggle";
import { Button } from "./ui/button";


export default function Navbar() {
  const { isOpen, setIsOpen } = useSidebarState();

  return (
    <nav className="bg-sky-400 fixed top-0 z-20 w-full p-2 text-white rounded-t-md dark:text-gray-400 dark:bg-sky-800">
      <div className="container mx-auto grid grid-cols-5 gap-4 content-center">
        {/* Left */}
        <div className="col-span-1 flex gap-2 justify-between items-center md:gap-6">
          <Button size='icon' onClick={() => setIsOpen(!isOpen)} className="bg-transparent cursor-pointer shadow-none">
            <List className="text-xl md:text-2xl dark:text-gray-400" />
          </Button>
          <Button asChild size='icon' className="bg-transparent cursor-pointer shadow-none">
            <Link href='/'>
              <Home className="text-xl md:text-2xl dark:text-gray-400" />
            </Link>
          </Button>
        </div>
        {/* Middle */}
        <div className="col-span-3 gap-2 select-none flex justify-center items-center bg-white rounded-full  dark:bg-gray-300 sm:gap-4 md:gap-8">
          <span className="text-sky-800">Your List</span>
          <List className="text-sky-800" size={"1.5em"} />
        </div>
        {/* Right */}
        <div className="col-span-1 gap-2 flex justify-between items-center md:gap-6">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav >
  )
}
