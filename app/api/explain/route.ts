import { anthropic } from "@/lib/anthropic";

export async function POST(request: Request) {
  const { text, pageContext } = await request.json();

  if (!text || typeof text !== "string") {
    return Response.json({ error: "Missing text" }, { status: 400 });
  }

  const trimmed = text.slice(0, 200);

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    system: `You are a helper on the AI Hub, an educational site about Claude Code for non-technical users. The user highlighted a word or phrase on the "${pageContext || "unknown"}" page. Give a brief 2-3 sentence explanation in plain English. No code, no jargon. If it's a common English word, explain it in the context of AI and Claude Code.`,
    messages: [{ role: "user", content: `Explain: "${trimmed}"` }],
  });

  const explanation =
    message.content[0].type === "text" ? message.content[0].text : "";

  return Response.json({ explanation });
}
