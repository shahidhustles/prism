const extensionMap: Record<
  "javascript" | "typescript" | "python" | "java" | "cpp" | "c",
  string
> = {
  javascript: "main.js",
  typescript: "main.ts",
  python: "main.py",
  java: "Main.java",
  cpp: "main.cpp",
  c: "main.c",
};

// Map from user-facing Language type to API language format
export const languageMap: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
  C: "c",
};

const versionMap: Record<
  "javascript" | "typescript" | "python" | "java" | "cpp" | "c",
  string
> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  cpp: "10.2.0",
  c: "10.2.0",
};

export async function POST(req: Request) {
  console.log("[DEBUG] POST request received");

  const {
    language,
    content,
  }: {
    language: string;
    content: string;
  } = await req.json();

  // Trim any extra whitespace from the language
  const cleanLanguage = language.trim();

  console.log(`[DEBUG] Language: ${cleanLanguage}`);
  console.log(`[DEBUG] Content preview: ${content.substring(0, 100)}...`);

  try {
    console.log(`[DEBUG] Preparing request to Piston API`);
    // Look up the API language identifier
    const apiLanguage = languageMap[cleanLanguage] as keyof typeof extensionMap;

    console.log(
      `[DEBUG] Mapped language '${cleanLanguage}' to API language '${apiLanguage}'`
    );

    // Ensure we're sending a complete and valid request
    if (!apiLanguage) {
      throw new Error(`Unsupported language: ${cleanLanguage}`);
    }

    const requestBody = {
      language: apiLanguage,
      files: [{ name: extensionMap[apiLanguage], content }],
      version: versionMap[apiLanguage],
    };
    console.log(
      `[DEBUG] Request body: ${JSON.stringify(requestBody, null, 2)}`
    );

    const result = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log(`[DEBUG] Piston API response status: ${result.status}`);
    const data = await result.json();
    console.log(
      `[DEBUG] Piston API response: ${JSON.stringify(data, null, 2)}`
    );

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
