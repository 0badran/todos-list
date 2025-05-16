"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { editTask } from "@/services";
import { toastError, toastSuccess } from "@/helpers/global-toasts";
import { isLoggedIn } from "@/app/todo/page";
import useTodosStore from "@/zustand/todos-store";
import { LoaderCircle, Save, SquarePen, X } from "lucide-react";

export default function EditTask({ id, title }: { id: string, title: string }) {
   const [editingId, setEditingId] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [value, setValue] = useState<string>(title);
   const { updateTodo } = useTodosStore();
   const openForm = async (id: string) => {
      setEditingId(id);
   }
   const handleEditTask = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      if (isLoggedIn) {
         setIsLoading(true);
         const data = await editTask(id, formData.get('title') as string);
         setIsLoading(false);
         if (data.error) {
            return toastError(data.message);
         }
      } else {
         updateTodo(id, formData.get('title') as string);
      }

      toastSuccess("Task edited successfully!");
      setEditingId(null);
   }

   return (
      <>
         {editingId === id ? (
            <form onSubmit={handleEditTask} className="flex h-full gap-2">
               <Input type="text" defaultValue={title} className="h-full !p-2 w-full" onChange={(e) => setValue(e.target.value)} name="title" placeholder="Title" />
               <Button disabled={isLoading || !value} size='lg' type="submit" className="w-fit md:w-full mx-auto h-full max-md:p-4 focus:outline-hidden text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  <div className="md:hidden block">
                     {
                        isLoading ?
                           <LoaderCircle className="animate-spin" />
                           :
                           <Save />
                     }
                  </div>
                  <span className="md:block hidden">{isLoading ? 'Editing...' : 'Save'}</span>
               </Button>
               <Button size='lg' className="w-fit md:w-full h-full mx-auto max-md:p-4" type="reset" variant={"secondary"} onClick={() => setEditingId(null)}>
                  <X className="md:hidden block" />
                  <span className="hidden md:block">Cancel</span>
               </Button>
            </form>
         ) : (
            <div className="grid grid-cols-2 gap-2 h-full items-baseline ">
               <p className="font-bold line-clamp-1 text-gray-950 dark:text-white">{title}</p>
               <Button size='lg' className="w-fit mx-auto md:w-full h-full max-md:p-4 focus:outline-hidden text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm dark:focus:ring-yellow-900" onClick={() => openForm(id)}>
                  <SquarePen className="md:hidden block" />
                  <span className="hidden md:block">Edit</span>
               </Button>
            </div>
         )}
      </>
   );
}