"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function TopButton() {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (window.scrollY > 50) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      });
      return () => {
         window.removeEventListener('scroll', () => {
            setIsVisible(false);
         });
      }
   }, []);


   return (
      <Link href="#">
         <Button className={clsx(`fixed hidden right-16 bottom-16`, {
            "block": isVisible
         })}
         >
            <ArrowUp className="animate-bounce" />
         </Button>
      </Link>
   );
}