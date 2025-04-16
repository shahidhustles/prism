import React from "react";
import { Button } from "./ui/button";
import { Play, MessageSquare } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full container mx-auto z-50 px-4 py-2 rounded-lg flex items-center justify-between h-12">
      <div className="flex items-center">
        <h1 className="text-xl font-mono text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
          PRISM
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          size="sm"
          className="text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]"
        >
          <Play className="size-4" />
          Run
        </Button>
        <Button variant="outline" size="icon">
          <MessageSquare className="size-4" />
        </Button>
      </div>
    </nav>
  );
}
