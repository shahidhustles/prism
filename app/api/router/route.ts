export async function POST(req: Request) {
  const {
    message,
    route,
  }: {
    message: string;
    route: string;
  } = await req.json();

  if (route == "explain") {
    const messages = [
      {
        role: "user",
        content: message,
      },
    ];
    const result = await fetch("/api/chat", {
      body: JSON.stringify({
        messages,
      }),
    });

    
  }
}
