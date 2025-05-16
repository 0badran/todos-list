import DisplayUpcomingTodos from "@/components/display-upcoming-todos";
import { Todo } from "@/lib/types";
import { sql } from "@vercel/postgres";

export default async function TodoUpcoming() {
    const { rows } = await sql<Todo>`SELECT id, title FROM todos WHERE type = 'upcoming' ORDER BY createdAt DESC;`;
    console.log({ rows });

    return (
        <DisplayUpcomingTodos data={rows} />
    )
}
