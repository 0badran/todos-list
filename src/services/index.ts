"use server";
import { TodoSchema } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";


export async function createTodo(formData: FormData) {
   const result = TodoSchema.safeParse({
      task: formData.get("title")
   });
   if (result.error) {
      return { success: false, error: true, message: "String must contain at least 1 character(s)" };
   }

   await sql`INSERT INTO todos(title) VALUES (${result.data.task})`;
   revalidatePath("/todo");
   return { success: result.success, error: false, message: "Todo Added Successfully!" };
}

export async function moveTaskToRecycleBin(id: string) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`UPDATE todos SET type = 'deleted' WHERE id = ${id}`;
   revalidatePath("/todo");
   return { success: true, error: false, message: "Task moved to Recycle Bin!" };
}

export async function removeTask(id: string) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`DELETE FROM todos WHERE id = ${id}`;
   revalidatePath("/todo/recycle-bin");
   return { success: true, error: false, message: "Task removed!" };
}

export async function restoreTask(id: string) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`UPDATE todos SET type = 'upcoming' WHERE id = ${id}`;
   revalidatePath("/todo/recycle-bin");
   return { success: true, error: false, message: "Task restored successfully!" };
}

export async function completeTask(id: string) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`UPDATE todos SET type = 'completed' WHERE id = ${id}`;
   revalidatePath("/todo");
   return { success: true, error: false, message: "Task completed!" };
}

export async function editTask(id: string, newTitle: string) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`UPDATE todos SET title = ${newTitle} WHERE id = ${id}`;
   revalidatePath("/todo");
   return { success: true, error: false, message: "Task edited successfully!" };
}