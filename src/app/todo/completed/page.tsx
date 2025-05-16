import DisplayCompletedTodos from "@/components/display-completed-todos";
import { Todo } from "@/lib/types";
import { sql } from "@vercel/postgres";


export default async function Completed() {
    const { rows } = await sql<Todo>`SELECT id, title FROM todos WHERE type = 'completed';`;
    return (
        <DisplayCompletedTodos data={rows} />
    )
}