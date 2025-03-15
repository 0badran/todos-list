"use client";

import { editTask } from "@/api/actions";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";

export default function EditTask({ id, title }: { id: number, title: string }) {
   const [editingId, setEditingId] = useState<number | null>(null);

   const openForm = async (id: number) => {
      setEditingId(id);
   }
   const handleEditTask = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const newTitle = formData.get("title") as string;
      const data = await editTask(id, newTitle);
      if (data.error) {
         toast.error(data.message, {
            style: {
               background: "#F05252",
               color: "white"
            }
         });
      }
      setEditingId(null);
   }

   return (
      <>
         {editingId === id ? (
            <form onSubmit={handleEditTask} className="flex justify-around gap-2">
               <Input type="text" name="title" placeholder="Title" />
               <Button size='lg' type="submit" className="focus:outline-hidden text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save</Button>
               <Button size='lg' type="reset" variant={"secondary"} onClick={() => setEditingId(null)}>Cancel</Button>
            </form>
         ) : (
            <div className="grid grid-cols-2">
               <p className="font-bold text-gray-950 dark:text-white">{title}</p>
               <Button size='lg' className="focus:outline-hidden text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => openForm(id)}>
                  Edit
               </Button>
            </div>
         )}
      </>
   );
}