"use client";
import { restoreTask } from "@/actions";
import { toastError, toastSuccess } from "@/helpers/toasts";
import { useState } from "react";
import { Button } from "./ui/button";


export default function RestoreTaskButton({ id }: { id: number }) {
    const [state, setState] = useState<boolean>();
    const handleRestoreTask = async (id: number) => {
        setState(true);
        const data = await restoreTask(id);
        setState(false);
        if (data.error) {
            toastError(data.message);
            return;
        }
        toastSuccess(data.message);
    }
    return (
        <Button variant='secondary' disabled={state} onClick={() => handleRestoreTask(id)}>
            {state ? "Restoring..." : "Restore"}
        </Button>
    )
}

