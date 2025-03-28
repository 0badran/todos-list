"use client";
import { moveTaskToRecycleBin, removeTask } from "@/actions";
import { toastError, toastSuccess } from "@/helpers/toasts";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";


export default function DeleteTaskButton({ id }: { id: number }) {
    const [recycleBinPending, setRecycleBinPending] = useState<boolean>();
    const [removeTaskPending, setRemoveTaskPending] = useState<boolean>();

    const handleRemoveTask = async (id: number) => {
        setRemoveTaskPending(true);
        const data = await removeTask(id);
        setRemoveTaskPending(false);
        if (data.error) {
            return toastError(data.message);
        }
        toastSuccess(data.message)
    }

    const handleRecycleBin = async (id: number) => {
        setRecycleBinPending(true);
        const data = await moveTaskToRecycleBin(id);
        setRecycleBinPending(false);
        if (data.error) {
            toastError(data.message);
            return;
        }
        toastSuccess(data.message);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700">Remove</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Remove task</DialogTitle>
                    <DialogDescription>
                        You will delete this task finally, if you click Yes. Click Recycle bin to move it to Recycle Bin.
                    </DialogDescription>
                </DialogHeader>
                <div className="text-center">
                    <CircleAlert className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this task?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={() => handleRemoveTask(id)}
                            disabled={removeTaskPending}
                            className="w-full border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700"
                        >
                            {removeTaskPending ? "Task removing..." : "Yes, I'm sure"}
                        </Button>
                        <Button
                            onClick={() => handleRecycleBin(id)}
                            disabled={recycleBinPending}
                            variant={"secondary"}
                        >
                            Recycle bin
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
