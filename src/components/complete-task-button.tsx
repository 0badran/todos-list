"use client";
import { completeTask } from "@/api/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";


export default function CompleteTaskButton({ id }: { id: number }) {
   const [isPending, setIsPending] = useState<boolean>();
   const handleComplete = async (id: number) => {
      setIsPending(true);
      const data = await completeTask(id);
      if (data.error) {
         toast.error(data.message, {
            style: {
               background: "#F05252",
               color: "white"
            }
         });
         return;
      }
      toast.success(data.message);
      setIsPending(false);
   }


   return (
      <Button size='lg' className="border w-full border-transparent bg-green-700 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-green-800 dark:bg-green-600 dark:focus:ring-green-800 dark:enabled:hover:bg-green-700" onClick={() => handleComplete(id)}>
         {isPending ? "Completed..." : "Complete"}
      </Button>
   );
}