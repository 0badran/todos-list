"use client";
import { restoreTask } from "@/api/actions";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";


export default function RestoreTaskButton({ id }: { id: number }) {
    const [state, setState] = useState<boolean>();
    const handleRestoreTask = async (id: number) => {
        setState(true);
        const data = await restoreTask(id);
        if (data.error) {
            toast.error(data.message, {
                style: {
                    background: "#F05252",
                    color: "white"
                }
            });
            return;
        }
        toast.success(data.message);
        setState(false);
    }
    return (
        <Button variant='secondary' disabled={state} onClick={() => handleRestoreTask(id)}>
            {state ? "Restored..." : "Restore"}
        </Button>
    )
}

