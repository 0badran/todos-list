import DisplayUpcomingTodos from "@/components/display-upcoming-todos";
import { Todo } from "@/lib/types";
import { isLoggedIn } from "@/lib/utils";
import { sql } from "@vercel/postgres";

export default async function TodoUpcoming() {
    const { rows } = isLoggedIn ? await sql<Todo>`SELECT id, title FROM todos WHERE type = 'upcoming' ORDER BY createdAt DESC;` : { rows: [] };

    return (
        <DisplayUpcomingTodos data={rows} />
    )
}
