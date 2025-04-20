"use client";

import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

// Add type definition for our custom window property
declare global {
  interface Window {
    updateEditorDiff?: (code: string) => void;
  }
}

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  readOnly?: boolean;
  isAiResponse?: boolean;
  originalCode?: string;
  onAcceptChanges?: (newCode: string) => void;
}

export function CodeSnippet({
  code,
  language = "javascript",
  title = "Code Snippet",
  readOnly = true,
  isAiResponse = false,
  onAcceptChanges,
}: CodeSnippetProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [editorHeight, setEditorHeight] = useState<string>("200px");

  useEffect(() => {
    if (!code) return;

    const lineCount = code.split("\n").length;

    const calculatedHeight = Math.min(Math.max(lineCount * 20, 100), 500);
    setEditorHeight(`${calculatedHeight}px`);
  }, [code]);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;

    if (editor) {
      const model = editor.getModel();
      if (model) {
        const lineCount = model.getLineCount();
        const calculatedHeight = Math.min(Math.max(lineCount * 20, 100), 500);
        setEditorHeight(`${calculatedHeight}px`);
      }
    }
  };

  const handleReviewChanges = () => {
    // Send code to main editor for diff review
    if (onAcceptChanges) {
      onAcceptChanges(code);
    }
    // If no handler provided, try to use global window method
    else if (window && typeof window.updateEditorDiff === "function") {
      window.updateEditorDiff(code);
    }
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
        {isAiResponse && (
          <button
            onClick={handleReviewChanges}
            className="text-xs px-1 py-1  rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            Review Changes
          </button>
        )}
      </div>

      {/* Code editor area */}
      <div className="font-mono text-sm p-4">
        <Editor
          height={editorHeight}
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
  originalCode="console.log('Old code');"
  isAiResponse={true}
  onAcceptChanges={(newCode) => console.log(newCode)}
/> */
}
