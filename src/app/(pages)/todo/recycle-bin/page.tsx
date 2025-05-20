import DisplayDeletedTodos from "@/components/display-deleted-todos";
import { Todo } from "@/lib/types";
import { getAllCurrentUserTasks } from "@/services";
import { stackServerApp } from "@/stack";



export default async function RecycleBin() {
    const user = await stackServerApp.getUser();
    let rows: Todo[] = [];
    if (user) {
        rows = await getAllCurrentUserTasks('deleted');
    }

    return (
        <DisplayDeletedTodos data={rows} />
    )
}