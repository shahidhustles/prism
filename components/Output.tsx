"use client";

import { Maximize2Icon } from "lucide-react";
import { useOutputStore } from "@/store/outputStore";

export function Output() {
  const { output, isLoading, error } = useOutputStore();

  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg">
      <div className="p-3 flex flex-row justify-between items-center border-b border-white/10 text-sm font-medium text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        Output
        <button className="h-6 w-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
          <Maximize2Icon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 font-mono text-sm h-[calc(100%-40px)] overflow-auto text-[#D1D1D1] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white/30 animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : output ? (
          output
        ) : (
          "Hello, AI IDE!"
        )}
      </div>
    </div>
  );
}
