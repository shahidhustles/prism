"use client";

import { Language, useLanguageStore } from "@/store/languageStore";
import { useOutputStore } from "@/store/outputStore";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { useMessageStore } from "@/store/messageStore";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Scissors, Type, PenIcon } from "lucide-react";
import { rewriteInLanguage } from "@/actions/rewriteInLanguage";
import { languageMap } from "@/app/api/execute/route";

export function MonacoEditor() {
  const { currentLanguage } = useLanguageStore();
  const { setContent, content } = useOutputStore();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const { setPendingMessage } = useMessageStore();

  const supportedLanguages: Language[] = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C",
  ];

  // Function to handle editor mounting
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;

    // Add listener for selection changes
    editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection();
      const hasTextSelected =
        selection &&
        !(
          selection.startLineNumber === selection.endLineNumber &&
          selection.startColumn === selection.endColumn
        );

      setHasSelection(!!hasTextSelected);

      if (hasTextSelected && selection) {
        const model = editor.getModel();
        if (model) {
          setSelectedText(model.getValueInRange(selection));
        }
      } else {
        setSelectedText("");
      }
    });
  };

  // Context menu actions
  const handleRewrite = async (language: string) => {
    const code = await rewriteInLanguage(language, selectedText);
    const model = editorRef?.current?.getModel();
    model?.setValue(code);
  };

  const handleUppercase = () => {
    if (editorRef.current && selectedText) {
      const selection = editorRef.current.getSelection();
      if (selection) {
        editorRef.current.executeEdits("uppercase-operation", [
          {
            range: selection,
            text: selectedText.toUpperCase(),
          },
        ]);
      }
    }
  };

  const handleExplain = () => {
    console.log("Setting pending message in store");
    // We only need to set the pending message - AiComposer will handle the rest
    setPendingMessage(selectedText);
  };

  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg">
      <div className="p-3 border-b border-white/10 flex items-center">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
      </div>
      <div
        ref={editorContainerRef}
        className="h-[calc(100%-40px)] overflow-auto font-mono text-sm p-4 relative"
      >
        <ContextMenu>
          <ContextMenuTrigger disabled={!hasSelection} asChild>
            <div className="h-full w-full">
              <Editor
                onChange={(value) => {
                  setContent(value || "");
                }}
                onMount={handleEditorDidMount}
                height="100%"
                language={languageMap[currentLanguage]}
                value={content}
                theme="vs-light"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  fontLigatures: true,
                  smoothScrolling: true,
                  fontFamily: "var(--font-jetbrains-mono)",
                  contextmenu: false,
                }}
              />
            </div>
          </ContextMenuTrigger>
          {/* TODO : Add shortcuts Later */}
          <ContextMenuContent
            className="backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/20 
          shadow-xl rounded-lg"
          >
            <ContextMenuSub>
              <ContextMenuSubTrigger className="flex items-center gap-2 text-white focus:bg-white/20 focus:text-white">
                <PenIcon className="size-4 text-black" />
                Rewrite
              </ContextMenuSubTrigger>
              <ContextMenuSubContent
                className="w-48 backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/20 
              shadow-xl rounded-lg overflow-visible max-h-none"
              >
                {supportedLanguages.map((lang) => (
                  <ContextMenuItem
                    key={lang}
                    onClick={() => handleRewrite(lang)}
                    disabled={currentLanguage === lang}
                  >
                    {lang}
                  </ContextMenuItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuItem
              className="flex items-center gap-2 text-white focus:bg-white/20 focus:text-white"
              onClick={handleExplain}
            >
              <Scissors className="size-4 text-black" />
              Explain
            </ContextMenuItem>
            <ContextMenuSeparator className="bg-white/20" />
            <ContextMenuItem
              className="flex items-center gap-2 text-white focus:bg-white/20 focus:text-white"
              onClick={handleUppercase}
            >
              <Type className="size-4" />
              UPPERCASE
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
}
