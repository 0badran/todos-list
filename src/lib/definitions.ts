import { z } from "zod";


export const TodoSchema = z.object({
  task: z.string().trim().min(1).max(60)
})

// interface User {
//   id?: number,
//   first_name: string,
//   last_name: string,
//   email: string,
//   hash: string,
//   created_at?: string,
//   updated_at?: string
// }