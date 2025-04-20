"use client";

import { Language, useLanguageStore } from "@/store/languageStore";
import { useOutputStore } from "@/store/outputStore";
import { Editor, DiffEditor } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import { useMessageStore } from "@/store/messageStore";
import { useDiffStore } from "@/store/diffStore";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { MessageCircle, PenIcon, HelpCircle, Check, X } from "lucide-react";
import { rewriteInLanguage } from "@/actions/rewriteInLanguage";
import { languageMap } from "@/app/api/execute/route";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function MonacoEditor() {
  const { currentLanguage } = useLanguageStore();
  const { setContent, content } = useOutputStore();
  const { setOriginalCode, originalCode } = useDiffStore();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(
    null
  );
  const [hasSelection, setHasSelection] = useState(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [selectionPosition, setSelectionPosition] = useState<{
    left: number;
    top: number;
    height: number;
  } | null>(null);
  const [showDiff, setShowDiff] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>("");
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const { setPendingMessage, setPendingInput } = useMessageStore();

  const supportedLanguages: Language[] = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C",
  ];

  // Store the original code whenever content changes
  useEffect(() => {
    if (!showDiff) {
      setOriginalCode(content);
    }
  }, [content, setOriginalCode, showDiff]);

  // Show diff when we have new code to compare
  useEffect(() => {
    if (newCode && originalCode) {
      setShowDiff(true);
    }
  }, [newCode, originalCode]);

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

          // Calculate the position of the selection
          const endLineNumber = selection.endLineNumber;
          const endColumnNumber = selection.endColumn;

          // Get the coordinates of the end position of the selection
          const endPosition = editor.getScrolledVisiblePosition({
            lineNumber: endLineNumber,
            column: endColumnNumber,
          });

          if (endPosition) {
            // Use the position to place the buttons below the selection
            setSelectionPosition({
              left: endPosition.left,
              top: endPosition.top + endPosition.height,
              height: endPosition.height,
            });
          }
        }
      } else {
        setSelectedText("");
        setSelectionPosition(null);
      }
    });

    // Listen for editor scroll events and adjust icon position
    editor.onDidScrollChange(() => {
      if (hasSelection && editorRef.current) {
        const selection = editorRef.current.getSelection();
        if (selection) {
          const endPosition = editorRef.current.getScrolledVisiblePosition({
            lineNumber: selection.endLineNumber,
            column: selection.endColumn,
          });

          if (endPosition) {
            setSelectionPosition({
              left: endPosition.left,
              top: endPosition.top + endPosition.height,
              height: endPosition.height,
            });
          }
        }
      }
    });
  };

  // Function to handle diff editor mounting
  const handleDiffEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    diffEditorRef.current = editor;
  };

  // Context menu actions
  const handleRewrite = async (language: string) => {
    // Store original code before rewriting
    setOriginalCode(selectedText);

    const code = await rewriteInLanguage(language, selectedText);
    const model = editorRef?.current?.getModel();
    model?.setValue(code);
  };

  const handleExplain = () => {
    // Store original code when sending to explain
    setOriginalCode(selectedText);

    setPendingMessage(
      `Explain this code: \n\`\`\`${currentLanguage}\n${selectedText}\n\`\`\``
    );
  };

  const handleAddToChat = () => {
    // Store original code when adding to chat
    setOriginalCode(selectedText);

    setPendingInput(`${selectedText}`);
  };

  const handleAcceptChanges = () => {
    if (diffEditorRef.current) {
      const acceptedCode = diffEditorRef.current.getModifiedEditor().getValue();
      setContent(acceptedCode);
      setShowDiff(false);
      setNewCode("");
    }
  };

  const handleRejectChanges = () => {
    setShowDiff(false);
    setNewCode("");
  };

  // Method to update new code from external components

  // Expose updateDiffCode to parent components
  useEffect(() => {
    const updateDiffCode = (code: string) => {
      setOriginalCode(content);
      setNewCode(code);
      setShowDiff(true);
    };
    if (window) {
      window.updateEditorDiff = updateDiffCode;
    }

    return () => {
      if (window) {
        delete window.updateEditorDiff;
      }
    };
  }, [content]);

  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg">
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>

        {showDiff && (
          <div className="flex gap-2">
            <button
              onClick={handleAcceptChanges}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-green-500/50 hover:bg-green-500/70 transition-colors text-white"
            >
              <Check className="h-3 w-3" />
              Accept
            </button>
            <button
              onClick={handleRejectChanges}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-red-500/50 hover:bg-red-500/70 transition-colors text-white"
            >
              <X className="h-3 w-3" />
              Reject
            </button>
          </div>
        )}
      </div>
      <div
        ref={editorContainerRef}
        className="h-[calc(100%-40px)] overflow-auto font-mono text-sm p-4 relative"
      >
        {!showDiff ? (
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
            <ContextMenuContent
              className="backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/20 
            shadow-xl rounded-lg"
            >
              <ContextMenuSub>
                <ContextMenuSubTrigger className="flex items-center gap-2 text-white focus:bg-white/20 focus:text-white">
                  <PenIcon className="size-4 text-black" />
                  Rewrite
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
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
                <HelpCircle className="size-4 text-black" />
                Explain
                <ContextMenuShortcut>⇧⌘E</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuItem
                className="flex items-center gap-2 text-white focus:bg-white/20 focus:text-white"
                onClick={handleAddToChat}
              >
                <MessageCircle className="size-4 text-black" />
                Add to Chat
                <ContextMenuShortcut>⇧⌘U</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ) : (
          <DiffEditor
            original={originalCode}
            modified={newCode}
            language={languageMap[currentLanguage]}
            height="100%"
            theme="vs-light"
            onMount={handleDiffEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              fontLigatures: true,
              smoothScrolling: true,
              fontFamily: "var(--font-jetbrains-mono)",
              renderSideBySide: false,
              enableSplitViewResizing: false,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              contextmenu: false,
              renderLineHighlight: "all",
              scrollbar: {
                vertical: "auto",
                horizontal: "auto",
              },
            }}
          />
        )}

        {hasSelection && selectionPosition && !showDiff && (
          <div
            className="absolute flex space-x-2 z-10"
            style={{
              left: `${selectionPosition.left}px`,
              top: `${selectionPosition.top + 2}px`,
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleExplain}
                  className="p-1 rounded-md text-white bg-black/50 shadow-md"
                >
                  Explain (⇧⌘E)
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Explain the current code selection
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleAddToChat}
                  className="p-1 rounded-md bg-black/50 shadow-md text-white"
                >
                  Add to Chat (⇧⌘U)
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Add the selected code to chat.
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}
