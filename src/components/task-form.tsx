"use client";
import { createTodo } from "@/api/actions";
import { toastSuccess } from "@/helpers/global-toasts";
import { useRef, useState } from "react";
import TaskSubmitButton from "./submit-task-button";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const initialState = {
   message: "",
   success: false,
   error: false,
};

export default function TaskForm({ setIsForm }: { setIsForm: (isForm: boolean) => void }) {
   const [state, setState] = useState(initialState);
   const formRef = useRef<HTMLFormElement>(null);


   const clientAction = async (formData: FormData) => {
      const response = await createTodo(formData);
      if (response.error) {
         setState({ ...state, error: true, message: response.message });
         return;
      }
      formRef.current?.reset();
      toastSuccess(response.message);
   };

   return (
      <form ref={formRef} action={clientAction} className="md:w-1/2">
         <div className="mb-3">
            <Input onChange={() => setState(initialState)} type="text" name="title" placeholder="Title" className="bg-white text-gray-950 dark:placeholder:text-white dark:text-white dark:bg-gray-400" />
            {state.error && <p aria-live="polite" className="text-red-500 mb-2">{state.message}</p>}
         </div>
         <div className="flex space-x-4">
            <TaskSubmitButton />
            <Button variant='secondary' onClick={() => { setIsForm(false); formRef.current?.reset() }}>
               Cancel
            </Button>
         </div>
      </form>
   );
}
