"use client";
import { toastError, toastSuccess } from "@/helpers/global-toasts";
import { moveTaskToRecycleBin, removeTask } from "@/services";
import useTodosStore from "@/zustand/todos-store";
import { useUser } from "@stackframe/stack";
import { CircleAlert, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function DeleteTaskButton({ id }: { id: string }) {
  const [recycleBinPending, setRecycleBinPending] = useState<boolean>();
  const [removeTaskPending, setRemoveTaskPending] = useState<boolean>();
  const { removeTodo, moveTodoToRecycleBin } = useTodosStore();
  const user = useUser();

  const handleRemoveTask = async (id: string) => {
    if (user) {
      setRemoveTaskPending(true);
      const data = await removeTask(id);
      setRemoveTaskPending(false);
      if (data.error) {
        return toastError(data.message);
      }
    } else {
      removeTodo(id);
    }
    toastSuccess("Task removed!");
  };

  const handleRecycleBin = async (id: string) => {
    if (user) {
      setRecycleBinPending(true);
      const data = await moveTaskToRecycleBin(id);
      setRecycleBinPending(false);
      if (data.error) {
        toastError(data.message);
        return;
      }
    } else {
      moveTodoToRecycleBin(id);
    }
    toastSuccess("Task moved to Recycle Bin!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit md:w-full mx-auto h-full max-md:p-4 border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700">
          <Trash2 className="md:hidden block" />
          <span className="hidden md:block">Remove</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Remove task</DialogTitle>
        <DialogDescription>
          You will delete this task finally, if you click Yes. Click Recycle bin
          to move it to Recycle Bin.
        </DialogDescription>
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
              {recycleBinPending ? "Moving..." : "Recycle Bin"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
