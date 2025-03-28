import ApiResponse from "@/helpers/api-response";
import asyncWrapper from "@/helpers/async-wrapper";
import { TodoSchema } from "@/lib/definitions";
import { httpStatusText } from "@/lib/utils";
import { sql } from "@vercel/postgres";

const apiResponse = new ApiResponse();

export const PUT = (req: Request, { params }: { params: Promise<{ id: string }> }) => asyncWrapper(async () => {
   const { id } = await params;
   const formData = await req.formData();
   const newTitle = formData.get("title") as string;
   const result = TodoSchema.safeParse({
      task: newTitle
   });

   if (result.error) {
      return apiResponse.create({
         message: 'Validation Error',
         code: 400, status: httpStatusText.ERROR,
         errors: result.error.errors
      });
   }

   await sql`UPDATE todos SET title = ${newTitle} WHERE id = ${id}`;

   return apiResponse.create({
      message: 'Task Updated Successfully!',
      code: 200,
      status: httpStatusText.SUCCESS,
      data: result.data
   });
})