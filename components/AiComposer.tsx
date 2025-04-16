import React from "react";
import { Button } from "./ui/button";
import { Maximize2Icon } from "lucide-react";

export function AiComposer() {
  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg flex flex-col">
      <div className="flex flex-row justify-between items-center p-3 border-b border-white/10 text-sm font-medium text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        AI Assistant
        <button className="h-6 w-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
          <Maximize2Icon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 flex-1 overflow-auto text-[#D1D1D1] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        <div className="mb-4">
          <p className="mb-2">Sure! Heres the function explained:</p>
          <p className="mb-2">
            This function greet takes a name argument and prints a greeting
            message.
          </p>
        </div>
      </div>
      <div className="p-3 border-t border-white/10 flex items-center">
        <Button variant="secondary" size="sm" className="w-full">
          Explain the function
        </Button>
      </div>
    </div>
  );
}
