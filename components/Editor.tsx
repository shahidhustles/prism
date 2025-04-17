"use client";

import { useLanguageStore } from "@/store/languageStore";
import { useOutputStore } from "@/store/outputStore";
import { Editor } from "@monaco-editor/react";
import { useEffect } from "react";

export function MonacoEditor() {
  const { currentLanguage } = useLanguageStore();
  const { setContent, content } = useOutputStore();

  useEffect(() => {
    if (currentLanguage === "python") {
      setContent("print('hello world')");
    } else if (currentLanguage === "javascript") {
      setContent("console.log('hello world')");
    } else if (currentLanguage === "typescript") {
      setContent(
        'function greet(name: string): void {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("World");'
      );
    } else if (currentLanguage === "c" || currentLanguage === "cpp") {
      setContent(
        '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
      );
    } else if (currentLanguage === "java") {
      setContent(
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
      );
    } else if (currentLanguage === "csharp") {
      setContent(
        'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}'
      );
    }
  }, [currentLanguage, setContent]);

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
          onChange={(value) => {
            setContent(value || "");
          }}
          height="100%"
          language={currentLanguage}
          value={content}
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
