import DisplayUpcomingTodos from "@/components/display-upcoming-todos";
import { Todo } from "@/lib/types";
import { getAllCurrentUserTasks } from "@/services";
import { stackServerApp } from "@/stack";

export default async function TodoUpcoming() {
    const user = await stackServerApp.getUser();
    let rows: Todo[] = [];
    if (user) {
        rows = await getAllCurrentUserTasks('upcoming');
    }

    return (
        <DisplayUpcomingTodos data={rows} />
    )
}
