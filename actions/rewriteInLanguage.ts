"use server";

import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function rewriteInLanguage(language: string, prevCode: string) {
  console.log(`rewriting in ${language}`);
  const { text: code } = await generateText({
    model: google("gemini-1.5-flash-latest"),
    system:
      "You are a code translation expert. Your task is to accurately translate code from one programming language to another while preserving the original logic and functionality. Use the standard indentation style and conventions that are appropriate for the target language. For example, if translating to Python, use 4-space indentation and Python's syntax conventions.",
    prompt: `Please rewrite the following code in ${language}. 
    Use proper indentation and code style conventions that are standard for
     ${language}. Ensure that all functionality is preserved. ensure that first line of you code is (according to comment syntax of ${language}) : 
     "Do not forget to change the language from drop down."
     
     Code to Convert :
    ${prevCode}`,
  });
  console.log(code);

  // Strip markdown code blocks if present
  const cleanedCode = stripMarkdownCodeBlocks(code);

  return cleanedCode;
}

function stripMarkdownCodeBlocks(text: string): string {
  // Remove markdown code block syntax (```language and ```)
  return text.replace(/^```[\w-]*\n/m, "").replace(/\n```$/m, "");
}
