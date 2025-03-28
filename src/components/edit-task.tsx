"use client";

import { editTask } from "@/actions";
import { toastError, toastSuccess } from "@/helpers/toasts";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function EditTask({ id, title }: { id: number, title: string }) {
   const [editingId, setEditingId] = useState<number | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const openForm = async (id: number) => {
      setEditingId(id);
   }
   const handleEditTask = async (event: FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = await editTask(id, formData);
      setIsLoading(false);
      if (data.errors) {
         return toastError(data.message);
      }
      toastSuccess(data.message);
      setEditingId(null);
   }

   return (
      <>
         {editingId === id ? (
            <form onSubmit={handleEditTask} className="flex justify-around gap-2">
               <Input type="text" defaultValue={title} name="title" placeholder="Title" />
               <Button disabled={isLoading} size='lg' type="submit" className="focus:outline-hidden text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  {isLoading ? 'Editing...' : 'Save'}
               </Button>
               <Button size='lg' type="reset" variant={"secondary"} onClick={() => setEditingId(null)}>Cancel</Button>
            </form>
         ) : (
            <div className="grid grid-cols-2 gap-4">
               <p className="font-bold line-clamp-1 text-gray-950 dark:text-white">{title}</p>
               <Button size='lg' className="focus:outline-hidden text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => openForm(id)}>
                  Edit
               </Button>
            </div>
         )}
      </>
   );
}