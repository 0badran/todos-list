import { Todo } from "@/lib/types";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface TodoState {
   todos: Todo[];
   addTodo: (todo: Todo) => void;
   updateTodo: (id: string, title: string) => void;
   removeTodo: (id: string) => void;
   moveTodoToRecycleBin: (id: string) => void;
   completeTodo: (id: string) => void;
   restoreTodo: (id: string) => void;
}

const useTodosStore = create(
   persist<TodoState>(
      (set) => ({
         todos: [],
         addTodo: (todo) => set(state => ({
            todos: [...state.todos, todo]
         })),
         updateTodo: (id, title) => set(state => ({
            todos: state.todos.map(item => item.id === id ? { ...item, title } : item)
         })),
         restoreTodo: (id) => set(state => ({
            todos: state.todos.map(item => item.id === id ? { ...item, type: 'upcoming', updatedAt: new Date().toISOString() } : item)
         })),
         removeTodo: (id) => set(state => ({
            todos: state.todos.filter(item => item.id !== id)
         })),
         completeTodo: (id) => set(state => ({
            todos: state.todos.map(item => item.id === id ? { ...item, type: 'completed', updatedAt: new Date().toISOString() } : item)
         })),
         moveTodoToRecycleBin: (id) => set(state => ({
            todos: state.todos.map(item => item.id === id ? { ...item, type: 'deleted', updatedAt: new Date().toISOString() } : item)
         }))
      }),
      {
         name: 'todos-store',
      }
   )
);

export default useTodosStore;