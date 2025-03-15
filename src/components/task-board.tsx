"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
const TaskForm = dynamic(() => import("./task-form"), {
  loading: () => <Loader2 className="animate-spin" />
});


export default function TaskBoard() {
  const [isForm, setIsForm] = useState(false);


  return (
    <div className="bg-cover bg-[url('/images/bg-createTask.jpg')] lg:bg-[url('/images/bg-createTask1.jpg')] rounded mt-7 p-16 text-white dark:text-gray-400">
      {
        isForm ?
          <TaskForm setIsForm={setIsForm} />
          :
          <h2 className="text-2xl font-bold mb-3 text-gray-950 dark:text-white">Check your current tasks here</h2>
      }
      {
        !isForm &&
        <TooltipProvider>
          <Tooltip >
            <TooltipTrigger asChild>
              <Button size='lg' className="border border-transparent bg-sky-700 text-white focus:ring-4 focus:ring-sky-300 enabled:hover:bg-sky-800 dark:bg-sky-600 dark:focus:ring-sky-900 dark:enabled:hover:bg-sky-700" onClick={() => setIsForm(true)}>
                Create one
              </Button>
            </TooltipTrigger>
            <TooltipContent className="dark:text-white dark:bg-gray-800">
              <p>Add Task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    </div>
  )
}
