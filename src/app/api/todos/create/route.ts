import { TodoSchema } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import ApiResponse from "@/helpers/api-response";
import { httpStatusText } from "@/lib/utils";
import asyncWrapper from "@/helpers/async-wrapper";

const apiResponse = new ApiResponse();

export const POST = (req: Request) => asyncWrapper(async () => {
   const formData = await req.formData();
   const result = TodoSchema.safeParse({
      task: formData.get("title")
   });


   if (result.error) {
      return apiResponse.create({
         message: 'Validation Error',
         code: 400, status: httpStatusText.ERROR,
         errors: result.error.errors
      });
   }

   await sql`INSERT INTO todos(title) VALUES (${result.data.task})`;

   return apiResponse.create({
      message: 'Todo Added Successfully!',
      code: 200,
      status: httpStatusText.SUCCESS,
      data: result.data
   });
});

