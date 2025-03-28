import ApiResponse from "@/helpers/api-response";
import asyncWrapper from "@/helpers/async-wrapper";
import { httpStatusText } from "@/lib/utils";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const apiResponse = new ApiResponse();
export const GET = (req: Request, { params }: { params: Promise<{ id: string }> }) => asyncWrapper(async () => {
   const { id } = await params;

   await sql`UPDATE todos SET type = 'completed' WHERE id = ${id}`;
   revalidatePath("/todo");
   return apiResponse.create({
      message: 'Task completed.',
      code: 200,
      status: httpStatusText.SUCCESS,
   })
})