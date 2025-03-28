import ApiResponse from "@/helpers/api-response";
import asyncWrapper from "@/helpers/async-wrapper";
import { httpStatusText } from "@/lib/utils";
import { sql } from "@vercel/postgres";

const apiResponse = new ApiResponse();
export const GET = () => asyncWrapper(async () => {
   const { rows } = await sql`SELECT id, title FROM todos WHERE type = 'deleted' ORDER BY created_at DESC;`;
   return apiResponse.create({
      message: 'Get all todos successfully.',
      code: 200,
      status: httpStatusText.SUCCESS,
      data: rows
   })
})