import RemoveTaskButton from "@/components/remove-task-button";
import RestoreTaskButton from "@/components/restore-task-button";
import ApiResponse from "@/helpers/api-response";
import fetchHelper from "@/helpers/fetch-helper";
import Image from "next/image";



export default async function RecycleBin() {
    const res = await fetchHelper({
        url: '/todos/get-recyclebin-tasks',
        method: 'get',
    });
    if (!res.ok) {
        return
    }
    const data: ApiResponse = await res.json();
    const courses: Array<{ id: number, title: string }> = data.data as [];

    if (!courses.length) return <Image className="mx-auto" unoptimized src="/images/delete-empty.gif" alt="delete task empty" width={450} height={300} />
    return (
        <ul>
            {courses.map((row) => {
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