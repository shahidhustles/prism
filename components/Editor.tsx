"use client";

import { Editor } from "@monaco-editor/react";

export function MonacoEditor() {
  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg">
      <div className="p-3 border-b border-white/10 flex items-center">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto font-mono text-sm p-4">
        <Editor
          height="100%"
          defaultLanguage="javascript" // TODO : change according to current language.
          defaultValue="console.log('hello world')"
          theme="vs-light"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            fontLigatures: true,
            smoothScrolling: true,
            fontFamily: "var(--font-jetbrains-mono)",
          }}
        />
      </div>
    </div>
  );
}
