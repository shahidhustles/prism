"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { CodeSnippet } from "./CodeSnippet";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";

interface MarkdownRendererProps {
  content: string;
}

// Define more specific component prop types
type ComponentProps = {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

type CodeProps = ComponentProps & {
  inline?: boolean;
};

type LinkProps = ComponentProps & {
  href?: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Use type assertion for components to avoid TypeScript errors
  const components = {
    // Custom code block renderer using our CodeSnippet component
    code({ className, children, inline, ...props }: CodeProps) {
      // Extract language from className if it exists
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : null;

      // Handle inline code or code blocks without language specified
      if (inline || !language) {
        return (
          <code
            className={`${
              inline ? "px-1.5 py-0.5 rounded bg-white/10 text-xs" : ""
            } font-mono`}
            {...props}
          >
            {children}
          </code>
        );
      }

      // For code blocks WITH specified language, use our CodeSnippet component
      const codeContent = String(children).replace(/\n$/, "");

      return (
        <div className="my-4">
          <CodeSnippet
            code={codeContent}
            language={language}
            title={`${language.charAt(0).toUpperCase() + language.slice(1)}`}
            readOnly={true}
          />
        </div>
      );
    },
    // Custom styling for other markdown elements (simplified approach)
    h1: ({ children, ...props }: ComponentProps) => (
      <h1 className="text-xl font-bold mt-4 mb-2" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentProps) => (
      <h2 className="text-lg font-bold mt-4 mb-2" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentProps) => (
      <h3 className="text-md font-bold mt-3 mb-1" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: ComponentProps) => (
      <p className="mb-3" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: ComponentProps) => (
      <ul className="list-disc pl-5 mb-3" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: ComponentProps) => (
      <ol className="list-decimal pl-5 mb-3" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: ComponentProps) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
    a: ({ children, href, ...props }: LinkProps) => (
      <a
        className="text-blue-400 hover:underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: ComponentProps) => (
      <blockquote
        className="border-l-4 border-white/20 pl-4 italic my-3"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props: ComponentProps) => (
      <hr className="my-4 border-white/20" {...props} />
    ),
    // Add pre element handling to ensure proper rendering of code blocks without language
    pre: ({ children, ...props }: ComponentProps) => (
      <pre
        className="whitespace-pre-wrap bg-white/5 p-4 rounded-lg my-4 overflow-auto"
        {...props}
      >
        {children}
      </pre>
    ),
  } as Components;

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
