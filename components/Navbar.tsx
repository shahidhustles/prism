"use client";
import { Button } from "./ui/button";
import { Play, MessageSquare, Code } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguageStore } from "@/store/languageStore";
import type { Language } from "@/store/languageStore";
import { useOutputStore } from "@/store/outputStore";
export function Navbar() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { setLoading, setOutput, content, setError } = useOutputStore();

  async function handleExecuteCode() {
    try {
      setLoading(true);
      setError(null); 
      
      const result = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: currentLanguage,
          content: content,
        }),
      });
      
      if (!result.ok) {
        throw new Error(`Error: ${result.status} ${result.statusText}`);
      }
  
      const data = await result.json();
      // Extract output based on Piston API response structure
      const output = data.run?.output || data.output || "";
      setOutput(output);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <nav className="w-full container mx-auto z-50 px-4 py-2 rounded-lg flex items-center justify-between h-12">
      <div className="flex items-center">
        <h1 className="text-xl font-mono text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
          PRISM
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Select
          value={currentLanguage}
          onValueChange={(value) => setLanguage(value as Language)}
        >
          <SelectTrigger
            className="w-[130px] text-[#F8F8F8] bg-black/20 backdrop-blur-sm border-[#f8f8f820]"
            size="sm"
          >
            <Code className="size-4 mr-1" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript (18.15.0)</SelectItem>
            <SelectItem value="typescript">TypeScript (5.0.3)</SelectItem>
            <SelectItem value="python">Python (3.10.0)</SelectItem>
            <SelectItem value="java">Java (15.0.2)</SelectItem>
            <SelectItem value="csharp">C# (5.0.201)</SelectItem>
            <SelectItem value="cpp">C++ (10.2.0)</SelectItem>
            <SelectItem value="c">C (10.2.0)</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleExecuteCode}
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
