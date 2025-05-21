"use client";
import { toastError, toastSuccess } from "@/helpers/global-toasts";
import { restoreTask } from "@/services";
import useTodosStore from "@/zustand/todos-store";
import { useUser } from "@stackframe/stack";
import { useState } from "react";
import { Button } from "./ui/button";

export default function RestoreTaskButton({ id }: { id: string }) {
  const [state, setState] = useState<boolean>();
  const { restoreTodo } = useTodosStore();
  const user = useUser();

  const handleRestoreTask = async (id: string) => {
    if (user) {
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
  };
  return (
    <Button
      variant="secondary"
      disabled={state}
      onClick={() => handleRestoreTask(id)}
    >
      {state ? "Restoring..." : "Restore"}
    </Button>
  );
}
