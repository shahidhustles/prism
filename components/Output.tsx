"use client";

import { useEffect } from "react";
import { useOutputStore } from "@/store/outputStore";
import { toast } from "sonner";
import { useMessageStore } from "@/store/messageStore";
import { useLanguageStore } from "@/store/languageStore";
import { useDiffStore } from "@/store/diffStore";

export function Output() {
  const { output, isLoading, error, errorCode } = useOutputStore();
  const { currentLanguage } = useLanguageStore();
  const { originalCode } = useDiffStore();
  const { setPendingMessage } = useMessageStore();
  // Show toast notification when errorCode is 1 using useEffect
  useEffect(() => {
    if (errorCode === 1) {
      toast.error("Code execution failed", {
        description: "Would you like AI to help solve this issue?",
        action: {
          label: "Let AI solve it",
          onClick: () => {
            setPendingMessage(
              `Solve the errors in this code: \n\`\`\`${currentLanguage}\n${originalCode}\n\`\`\``
            );
          },
        },
      });
    }
  }, [errorCode, currentLanguage, setPendingMessage,originalCode]); // Only re-run when errorCode changes

  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg">
      <div className="p-3 flex flex-row justify-between items-center border-b border-white/10 text-sm font-medium text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        Output
      </div>
      <div className="p-4 font-mono text-sm h-[calc(100%-40px)] overflow-auto text-[#D1D1D1] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white/30 animate-spin"></div>
          </div>
        ) : error || errorCode == 1 ? (
          <div className="text-red-400">{error || output}</div>
        ) : output ? (
          output
        ) : (
          "Hello, AI IDE!"
        )}
      </div>
    </div>
  );
}
