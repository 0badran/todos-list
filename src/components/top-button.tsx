"use client";

import clsx from "clsx";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
      <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={clsx(`fixed hidden right-16 bottom-16`, {
         "block": isVisible
      })}
      >
         <ArrowUp className="animate-bounce" />
      </Button>
   );
}