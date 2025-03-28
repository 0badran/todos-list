import CompleteTaskButton from "@/components/complete-task-button";
import DeleteTaskButton from "@/components/delete-task-button";
import EditTask from "@/components/edit-task";
import ApiResponse from "@/helpers/api-response";
import fetchHelper from "@/helpers/fetch-helper";
import Image from "next/image";


export default async function Todo() {
    const res = await fetchHelper({
        url: '/todos/get-all',
        method: 'get',
    });
    if (!res.ok) {
        return
    }
    const data: ApiResponse = await res.json();
    const courses: Array<{ id: number, title: string }> = data.data as [];
    if (courses?.length == 0) return <Image className="mx-auto" unoptimized src="/images/todo-empty.gif" alt="todo task empty" width={450} height={300} />
    return (
        <ul>
            {courses?.map((row) => {
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
