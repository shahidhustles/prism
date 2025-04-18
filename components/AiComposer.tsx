"use client";

import React, { useEffect } from "react";
import { Maximize2Icon, Send, Image as ImageIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMessageStore } from "@/store/messageStore";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function AiComposer() {
  const [selectedModel, setSelectedModel] = React.useState("gemini-2.0-flash");
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading: aiLoading,
  } = useChat({
    api: "/api/chat",
  });

  const { pendingMessage, isLoading, resetState } = useMessageStore();

  useEffect(() => {
    if (pendingMessage) {
      console.log(
        "Detected pending message, appending to chat:",
        pendingMessage
      );

      // Send to AI chat API
      append({
        role: "user",
        content: pendingMessage,
      });

      // Clear the pending message after sending
      resetState();
    }
  }, [pendingMessage, append, resetState]);

  const models = [
    { id: "gemini-2.0-flash", name: "Gemini 2.0 flash" },
    { id: "gpt-4o", name: "GPT-4o" },
  ];

  return (
    <div className="h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/10 shadow-lg flex flex-col">
      <div className="flex flex-row justify-between items-center p-3 border-b border-white/10 text-sm font-medium text-[#F8F8F8] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2">
          <span>AI Assistant</span>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="text-xs backdrop-blur-md bg-white/5 dark:bg-black/10 border border-white/20 hover:bg-white/10 dark:hover:bg-black/20 rounded-md px-2 py-1 outline-none shadow-sm transition-all duration-200">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="text-xs backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/20 rounded-md shadow-xl">
              {models.map((model) => (
                <SelectItem
                  key={model.id}
                  value={model.id}
                  className="hover:bg-white/10 dark:hover:bg-white/5 rounded-sm transition-colors duration-150"
                >
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button className="h-6 w-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
          <Maximize2Icon className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-auto text-[#D1D1D1] [text-shadow:0px_1px_6px_rgba(0,0,0,0.4)]">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center text-sm opacity-70">
            <p>Ask a question about your code or request assistance</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-white/10 ml-6"
                    : "bg-black/20 mr-6"
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {message.role === "user" ? "You" : "AI"}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {message.role === "user" ? (
                    message.content
                  ) : (
                    <MarkdownRenderer content={message.content} />
                  )}
                </div>
              </div>
            ))}
            {(isLoading || aiLoading) && (
              <div className="p-3 rounded-lg bg-black/20 mr-6">
                <div className="text-xs opacity-70 mb-1">AI</div>
                <div className="text-sm">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-white/50 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-white/50 rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-white/50 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              name="prompt"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about your code..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Attach image"
          >
            <ImageIcon className="h-4 w-4 text-white" />
          </button>
          <button
            type="submit"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            disabled={!input.trim() || isLoading || aiLoading}
          >
            <Send className="h-4 w-4 text-white shadow-sm" />
          </button>
        </form>
      </div>
    </div>
  );
}
