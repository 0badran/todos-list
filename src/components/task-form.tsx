"use client";
import { createTask } from "@/actions";
import { toastSuccess } from "@/helpers/toasts";
import { useActionState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


export default function TaskForm({ setIsForm }: { setIsForm: (isForm: boolean) => void }) {
   const [state, formAction, isPending] = useActionState(createTask, { isSubmitted: false });
   const formRef = useRef<HTMLFormElement>(null);

   if (state.isSubmitted && state.code === 200) {
      toastSuccess(state.message);
      state.isSubmitted = false;
      formRef.current?.reset();
   }

   return (
      <form ref={formRef} action={formAction} className="md:w-1/2">
         <div className="mb-3">
            <Input type="text" name="title" placeholder="Title" className="bg-white text-gray-950 dark:text-white dark:bg-gray-400" />
            {state?.error && <p aria-live="polite" className="text-red-500 mb-2">{state.message}</p>}
         </div>
         <div className="flex space-x-4">
            <Button
               disabled={isPending}
               className="border border-transparent bg-sky-700 text-white focus:ring-4 focus:ring-sky-300 enabled:hover:bg-sky-800 dark:bg-sky-600 dark:focus:ring-sky-900 dark:enabled:hover:bg-sky-700"
               type="submit">
               {isPending ? "Loading..." : "Add Task"}
            </Button>
            <Button variant='secondary' onClick={() => { setIsForm(false); formRef.current?.reset() }}>
               Cancel
            </Button>
         </div>
      </form>
   );
}
