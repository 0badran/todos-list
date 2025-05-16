import { z } from "zod";


export const TodoSchema = z.object({
  task: z.string().trim().min(1).max(60)
})

