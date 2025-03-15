"use client";
import { Notebook, BatteryCharging, Trash } from "lucide-react";
import Link from "next/link";

export default function NavigationButtons() {
  return (
    <section className="grid grid-cols-3 text-white gap-2 sm:gap-6 md:gap-8">
      <Link href="/todo" className="flex gap-2 p-6 justify-center items-center rounded bg-gradient-to-tr from-cyan-500 to-gray-300 hover:to-gray-500">
        <span className="hidden sm:inline">Upcoming</span>
        <Notebook className="h-8 w-8 sm:h-6 sm:w-6" />
      </Link>
      <Link href="/todo/completed" className="flex gap-2 p-6 justify-center items-center rounded bg-gradient-to-tr from-green-500 to-gray-300 hover:to-gray-500">
        <span className="me-1 hidden sm:inline">Completed</span>
        <BatteryCharging className="h-8 w-8 sm:h-6 sm:w-6" />
      </Link>
      <Link href="/todo/recycle-bin" className="flex gap-2 p-6 justify-center items-center rounded bg-gradient-to-tr from-red-500 to-gray-300 hover:to-gray-500">
        <span className="me-1 hidden sm:inline">Recycle Bin</span>
        <Trash className="h-8 w-8 sm:h-6 sm:w-6" />
      </Link>
    </section>
  )
}