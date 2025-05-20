'use client';
import { Todo } from "@/lib/types";
import useTodosStore from "@/zustand/todos-store";
import Image from "next/image";
import CompleteTaskButton from "./complete-task-button";
import DeleteTaskButton from "./delete-task-button";
import EditTask from "./edit-task";

export default function DisplayUpcomingTodos({ data }: { data: Todo[] }) {
   const { todos } = useTodosStore();
   const todoList = !!data.length ? data : todos.filter((todo) => todo.type === "upcoming").reverse();

   if (!todoList.length) return <Image className="mx-auto" unoptimized src="/images/todo-empty.gif" alt="todo task empty" width={450} height={300} />

   return (
      <ul>
         {todoList.map((row) => {
            return (
               <li key={row.id} className="grid grid-cols-5 md:grid-cols-4 gap-2 mb-3">
                  <div className="col-span-3 md:col-span-2">
                     <EditTask id={row.id} title={row.title} />
                  </div>
                  <CompleteTaskButton id={row.id} />
                  <DeleteTaskButton id={row.id} />
               </li>
            );
         })}
      </ul>
   );
}