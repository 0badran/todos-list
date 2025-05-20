"use client";
import { toastSuccess } from "@/helpers/global-toasts";
import initialTodo from "@/helpers/initial-todo";
import { createTodo } from "@/services";
import useTodosStore from "@/zustand/todos-store";
import { useUser } from "@stackframe/stack";
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
   const { addTodo } = useTodosStore();
   const user = useUser();



   const clientAction = async (formData: FormData) => {
      if (formData.get("title") === "") {
         setState({ ...state, error: true, message: "String must contain at least 1 character(s)" });
         return;
      }
      if (user) {
         formData.append("uuid", user.id);
         const response = await createTodo(formData);
         if (response.error) {
            setState({ ...state, error: true, message: response.message });
            return;
         }
         formRef.current?.reset();
      } else {
         addTodo(initialTodo(formData.get("title") as string));
      }
      toastSuccess('Todo Added Successfully!');
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
