"use client";
import { toastError, toastSuccess } from "@/helpers/global-toasts";
import { completeTask } from "@/services";
import useTodosStore from "@/zustand/todos-store";
import { useUser } from "@stackframe/stack";
import { ListCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function CompleteTaskButton({ id }: { id: string }) {
  const [isPending, setIsPending] = useState<boolean>();
  const { completeTodo } = useTodosStore();
  const user = useUser();

  const handleComplete = async (id: string) => {
    if (user) {
      setIsPending(true);
      const data = await completeTask(id);
      setIsPending(false);
      if (data.error) {
        return toastError(data.message);
      }
      return;
    }
    completeTodo(id);
    toastSuccess("Task completed!");
  };

  return (
    <Button
      size="lg"
      className="w-fit md:w-full mx-auto h-full max-md:p-4 border border-transparent bg-green-700 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-green-800 dark:bg-green-600 dark:focus:ring-green-800 dark:enabled:hover:bg-green-700"
      onClick={() => handleComplete(id)}
    >
      <div className="md:hidden block">
        {isPending ? <LoaderCircle className="animate-spin" /> : <ListCheck />}
      </div>
      <span className="md:block hidden">
        {isPending ? "Completing..." : "Complete"}
      </span>
    </Button>
  );
}
