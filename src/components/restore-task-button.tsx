"use client";
import { restoreTask } from "@/services";
import { toastError, toastSuccess } from "@/helpers/global-toasts";
import { useState } from "react";
import { Button } from "./ui/button";
import useTodosStore from "@/zustand/todos-store";
import { isLoggedIn } from "@/lib/utils";


export default function RestoreTaskButton({ id }: { id: string }) {
    const [state, setState] = useState<boolean>();
    const { restoreTodo } = useTodosStore();
    const handleRestoreTask = async (id: string) => {
        if (isLoggedIn) {
            setState(true);
            const data = await restoreTask(id);
            setState(false);
            if (data.error) {
                toastError(data.message);
            }
        } else {
            restoreTodo(id);
        }
        toastSuccess("Task restored successfully!");
    }
    return (
        <Button variant='secondary' disabled={state} onClick={() => handleRestoreTask(id)}>
            {state ? "Restoring..." : "Restore"}
        </Button>
    )
}

