import CompleteTaskButton from "@/components/complete-task-button";
import DeleteTaskButton from "@/components/delete-task-button";
import EditTask from "@/components/edit-task";
import { sql } from "@vercel/postgres";
import Image from "next/image";


export default async function Todo() {
    const { rows } = await sql`SELECT id, title FROM todos WHERE type = 'upcoming' ORDER BY created_at ASC;`;

    if (!rows.length) return <Image className="mx-auto" unoptimized src="/images/todo-empty.gif" alt="todo task empty" width={450} height={300} />
    return (
        <ul>
            {rows.map((row) => {
                return (
                    <li key={row.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="col-span-2">
                            <EditTask id={row.id} title={row.title} />
                        </div>
                        <CompleteTaskButton id={row.id} />
                        <DeleteTaskButton id={row.id} />
                    </li>
                );
            })}
        </ul>
    )
}
