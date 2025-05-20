import { Todo } from "@/lib/types";

export default function initialTodo(title: string): Todo {
   return {
      id: crypto.randomUUID(),
      title,
      type: "upcoming",
      uuid: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
   };
}