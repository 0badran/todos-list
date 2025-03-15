"use client";

import { useState } from "react";
import { CircleAlert } from 'lucide-react';
import { removeTask } from "@/api/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function RemoveTaskButton({ id }: { id: number }) {
    const [isPending, setIsPending] = useState<boolean>();
    const handleRemoveTask = async (id: number) => {
        setIsPending(true);
        const data = await removeTask(id);
        if (data.error) {
            toast.error(data.message, {
                style: {
                    background: "#F05252",
                    color: "white"
                }
            });
            return;
        }
        toast.error(data.message, {
            style: {
                background: "#F05252",
                color: "white"
            }
        });
        setIsPending(false);
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700">Remove</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Remove task</DialogTitle>
                        <DialogDescription>
                            You will delete this task finally, and you cannot restore it!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center">
                        <CircleAlert className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this task?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button disabled={isPending} className="w-full border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700" onClick={() => handleRemoveTask(id)}>
                                {isPending ? "Task removed..." : "Yes, I'm sure"}
                            </Button>
                            <Button disabled={isPending} variant={"secondary"}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
