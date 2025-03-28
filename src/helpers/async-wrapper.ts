import { httpStatusText } from "@/lib/utils";
import ApiResponse from "./api-response";

const apiResponse = new ApiResponse();

const asyncWrapper = (fun: () => Promise<Response>) => fun().then(res => res).catch(e =>
   apiResponse.create({
      message: e?.message || 'Something went wrong',
      code: 500,
      status: httpStatusText.ERROR,
      errors: e?.stack
   }));
export default asyncWrapper;