"use server";
import fetchHelper from "@/helpers/fetch-helper";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";


export async function createTask(prevState: unknown, formData: FormData) {
   const res = await fetchHelper({
      url: '/todos/create',
      method: 'POST',
      body: formData
   });
   if (res.ok) revalidatePath("/todo");
   const data = await res.json();
   data.isSubmitted = true;
   return data;
}

export async function moveTaskToRecycleBin(id: number) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`UPDATE todos SET type = 'deleted' WHERE id = ${id}`;
   revalidatePath("/todo");
   return { success: true, error: false, message: "Task moved to Recycle Bin!" };
}

export async function removeTask(id: number) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`DELETE FROM todos WHERE id = ${id}`;
   revalidatePath("/todo/recycle-bin");
   return { success: true, error: false, message: "Task removed!" };
}

export async function restoreTask(id: number) {
   if (!id) {
      return { success: false, error: true, message: "Invalid task ID" };
   }
   await sql`UPDATE todos SET type = 'upcoming' WHERE id = ${id}`;
   revalidatePath("/todo/recycle-bin");
   return { success: true, error: false, message: "Task restored successfully!" };
}

export async function completeTask(id: number) {
   const res = await fetchHelper({
      url: `/todos/complete/${id}`,
      method: 'GET'
   });
   if (res.ok) revalidatePath("/todo");
   const data = await res.json();
   return data;
}

export async function editTask(id: number, formData: FormData) {
   const res = await fetchHelper({
      url: `/todos/update/${id}`,
      method: 'PUT',
      body: formData
   });
   if (res.ok) revalidatePath("/todo");
   const data = await res.json();
   data.isSubmitted = true;
   return data;
}