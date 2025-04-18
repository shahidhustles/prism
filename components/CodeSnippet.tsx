"use client";

import React, { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { Maximize2Icon } from "lucide-react";
import * as monaco from "monaco-editor";

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  readOnly?: boolean;
}

export function CodeSnippet({
  code,
  language = "javascript",
  title = "Code Snippet",
  readOnly = true,
}: CodeSnippetProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
  };

  return (
    <div className="overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg">
      {/* Mac-style terminal header */}
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-sm font-medium text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
            {title}
          </span>
        </div>
        <button className="h-6 w-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
          <Maximize2Icon className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Code editor area */}
      <div className="font-mono text-sm p-4">
        <Editor
          height="200px" // Default height, can be adjusted via props
          language={language}
          value={code}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            fontLigatures: true,
            smoothScrolling: true,
            fontFamily: "var(--font-jetbrains-mono)",
            readOnly: readOnly,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            contextmenu: false,
            renderLineHighlight: "all",
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
}

//to use this :
{
  /* <CodeSnippet 
  code="console.log('Hello, world!');" 
  language="javascript"
  title="Example.js" 
/> */
}
