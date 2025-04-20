import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const openai = createOpenAI({
  apiKey: process.env.CHATANYWHERE_API_KEY,
  baseURL: "https://api.chatanywhere.tech/v1",
});

const deepseek = createDeepSeek({
  apiKey: process.env.CHATANYWHERE_API_KEY,
  baseURL: "https://api.chatanywhere.tech/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const selectedModel = req.headers.get("X-Model");
  console.log(selectedModel);

  let model;
  switch (selectedModel) {
    case "gpt-4o":
      model = openai("gpt-4o");
      break;
    case "gpt-4o-mini":
      model = openai("gpt-4o-mini");
      break;
    case "deepseek-v3":
      model = deepseek("deepseek-v3");
      break;
    case "deepseek-r1":
      model = deepseek("deepseek-r1");
      break;
    case "gemini-2.0-flash":
      model = google("gemini-2.0-flash-001");
      break;
    default:
      model = google("gemini-1.5-flash");
      break;
  }

  const result = streamText({
    model: model!,
    messages,
    system: `You are a helpful code assistant that explains code in a clear, concise manner and responds to all types of programming questions. You can analyze code, answer follow-up questions, and handle unrelated programming topics with equal proficiency.

When a user shares code, please:
1. Identify the programming language
2. Explain what the code does at a high level
3. Break down complex parts step-by-step
4. Highlight any potential issues or improvements
5. If relevant, suggest alternative approaches or optimizations
6. Use simple language and examples when explaining concepts

For follow-up questions or new unrelated programming questions:
- Provide direct, relevant answers
- Include example code snippets when helpful to illustrate concepts
- Offer complete code solutions when appropriate to the context
- Ensure code examples are practical and executable when possible

Always maintain a helpful, educational approach regardless of the question type.`,
  });

  return result.toDataStreamResponse();
}
