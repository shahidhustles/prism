"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Maximize2Icon, PlusCircleIcon } from "lucide-react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export function TodoList() {
  // Sample initial todos
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Build UI components", completed: false },
    { id: "2", text: "Implement editor functionality", completed: true },
    { id: "3", text: "Add Spotify integration", completed: false },
    { id: "4", text: "Connect AI assistant", completed: false },
  ]);

  const [newTask, setNewTask] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTodos((prevTodos) => [
        {
          completed: false,
          id: crypto.randomUUID(),
          text: inputValue.trim(),
        },
        ...prevTodos,
      ]);
      setInputValue("");
      setNewTask(false);
    }
  };

  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg flex flex-col">
      <div className="p-3 border-b border-white/10 text-sm font-medium flex justify-between items-center text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        Todo List
        <div className="flex gap-1">
          <button
            onClick={() => setNewTask(true)}
            className="h-6 w-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <PlusCircleIcon className="h-4 w-4" />
          </button>
          <button className="h-6 w-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <Maximize2Icon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul className="space-y-3 p-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {newTask && (
          <li className="p-3 border-b border-white/10">
            <input
              type="text"
              className="w-full p-2 rounded border border-white/20 bg-white/10 text-[#D1D1D1] focus:outline-none"
              placeholder="Type and press Enter to add task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTask}
              autoFocus
            />
          </li>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 group px-2 py-1.5 hover:bg-white/5 rounded-md transition-colors"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={cn(
                "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
                todo.completed
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-black/30 hover:border-black/50"
              )}
            >
              {todo.completed && <Check className="h-3 w-3" />}
            </button>
            <span
              className={cn(
                "text-sm transition-colors text-[#D1D1D1] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]",
                todo.completed && "line-through opacity-70"
              )}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
