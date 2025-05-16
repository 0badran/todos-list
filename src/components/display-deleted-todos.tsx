'use client';
import { isLoggedIn } from "@/app/todo/page";
import { Todo } from "@/lib/types";
import useTodosStore from "@/zustand/todos-store";
import Image from "next/image";
import RestoreTaskButton from "./restore-task-button";
import RemoveTaskButton from "./remove-task-button";

export default function DisplayDeletedTodos({ data }: { data: Todo[] }) {
   const { todos } = useTodosStore();

   const todoList = isLoggedIn ? data : todos.filter((todo) => todo.type === "deleted").reverse();
   if (!todoList.length) return <Image className="mx-auto" unoptimized src="/images/delete-empty.gif" alt="delete task empty" width={450} height={300} />

   return (
      <ul>
         {todoList.map((row) => {
            return (
               <li key={row.id} className="grid grid-cols-4 gap-4 mb-3">
                  <p className="col-span-2 font-bold">{row.title}</p>
                  <RestoreTaskButton id={row.id} />
                  <RemoveTaskButton id={row.id} />
               </li>
            );
         })}
      </ul>
   )
}