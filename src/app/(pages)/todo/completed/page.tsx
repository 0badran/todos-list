import DisplayCompletedTodos from "@/components/display-completed-todos";
import { Todo } from "@/lib/types";
import { getAllCurrentUserTasks } from "@/services";
import { stackServerApp } from "@/stack";


export default async function Completed() {
    const user = await stackServerApp.getUser();
    let rows: Todo[] = [];
    if (user) {
        rows = await getAllCurrentUserTasks('upcoming');
    }
    return (
        <DisplayCompletedTodos data={rows} />
    )
}