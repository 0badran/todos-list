"use client";
import { moveTaskToRecycleBin } from "@/api/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";


export default function DeleteTaskButton({ id }: { id: number }) {
    const [isPending, setIsPending] = useState<boolean>();
    const handleDelete = async (id: number) => {
        setIsPending(true);
        const data = await moveTaskToRecycleBin(id);
        if (data.error) {
            toast.error(data.message, {
                style: {
                    background: "#F05252",
                    color: "white"
                }
            });
            return;
        }
        toast.error(data.message);
        setIsPending(false);
    }
    return (
        <Button size='lg' disabled={isPending} className="w-full border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700" onClick={() => handleDelete(id)}>
            {isPending ? "Deleted..." : "Delete"}
        </Button>
    )
}

