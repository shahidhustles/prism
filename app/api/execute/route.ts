import { Language } from "@/store/languageStore";

const extensionMap: Record<
  "javascript" | "typescript" | "python" | "java" | "csharp" | "cpp" | "c",
  string
> = {
  javascript: "main.js",
  typescript: "main.ts",
  python: "main.py",
  java: "Main.java",
  csharp: "main.cs",
  cpp: "main.cpp",
  c: "main.c",
};

const versionMap: Record<
  "javascript" | "typescript" | "python" | "java" | "csharp" | "cpp" | "c",
  string
> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "5.0.201",
  cpp: "10.2.0",
  c: "10.2.0",
};

export async function POST(req: Request) {
  console.log("[DEBUG] POST request received");
  
  const {
    language,
    content,
  }: {
    language: Language;
    content: string;
  } = await req.json();
  
  console.log(`[DEBUG] Language: ${language}`);
  console.log(`[DEBUG] Content preview: ${content.substring(0, 100)}...`);

  try {
    console.log(`[DEBUG] Preparing request to Piston API`);
    const requestBody = {
      language,
      files: [{ name: extensionMap[language], content }],
      version: versionMap[language],
    };
    console.log(`[DEBUG] Request body: ${JSON.stringify(requestBody, null, 2)}`);
    
    const result = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    
    console.log(`[DEBUG] Piston API response status: ${result.status}`);
    const data = await result.json();
    console.log(`[DEBUG] Piston API response: ${JSON.stringify(data, null, 2)}`);

    return Response.json({
      output: data.run?.output || "",
      stderr: data.run?.stderr || "",
      compile: data.compile?.output || "",
      error: data.message || null,
    });
  } catch (error) {
    console.error(`[ERROR] Exception caught:`, error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
