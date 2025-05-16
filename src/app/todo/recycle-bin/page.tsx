import DisplayDeletedTodos from "@/components/display-deleted-todos";
import { Todo } from "@/lib/types";
import { sql } from "@vercel/postgres";



export default async function RecycleBin() {

    const { rows } = await sql<Todo>`SELECT id, title, type FROM todos WHERE type='deleted';`;
    return (
        <DisplayDeletedTodos data={rows} />
    )
}