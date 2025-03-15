import RemoveTaskButton from "@/components/remove-task-button";
import RestoreTaskButton from "@/components/restore-task-button";
import { sql } from "@vercel/postgres";
import Image from "next/image";



export default async function RecycleBin() {

    const { rows } = await sql`SELECT id, title, type FROM todos WHERE type='deleted';`;
    if (!rows.length) return <Image className="mx-auto" unoptimized src="/images/delete-empty.gif" alt="delete task empty" width={450} height={300} />
    return (
        <ul>
            {rows.map((row) => {
                return (
                    <li key={row.id} className="grid grid-cols-4 gap-4 mb-3">
                        <p className="col-span-2 font-bold">{row.title}</p>
                        <RestoreTaskButton id={row.id} />
                        <RemoveTaskButton id={row.id} />
                    </li>
                );
            })}
        </ul>
    )
}