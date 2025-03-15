"use client";
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';


function TaskSubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="border border-transparent bg-sky-700 text-white focus:ring-4 focus:ring-sky-300 enabled:hover:bg-sky-800 dark:bg-sky-600 dark:focus:ring-sky-900 dark:enabled:hover:bg-sky-700" type="submit" disabled={pending}>
            {pending ? "Loading..." : "Add Task"}
        </Button>
    )
}

export default TaskSubmitButton
