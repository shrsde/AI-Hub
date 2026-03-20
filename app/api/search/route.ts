import { anthropic } from "@/lib/anthropic";
import { contentIndex } from "@/data/content-index";
import { terms } from "@/data/terms";

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query || typeof query !== "string") {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const trimmed = query.slice(0, 300);

  const termsContext = terms
    .map((t) => `- ${t.word}: ${t.plain}`)
    .join("\n");

  const pagesContext = contentIndex
    .map((e) => `[${e.page} — ${e.section}] (${e.path}): ${e.content}`)
    .join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 400,
    system: `You are the search assistant for AI Hub, an educational site about Claude Code for non-technical users. Answer questions using ONLY the site content below.

SITE CONTENT:
${pagesContext}

GLOSSARY:
${termsContext}

Reply with JSON only, no markdown fences:
{"answer":"1-3 sentence answer in plain English","page":"page name","path":"/path","section":"section name","followUp":"a suggested follow-up question"}

If you can't find a relevant answer, use path "/" and say so honestly.`,
    messages: [{ role: "user", content: trimmed }],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "{}";

  try {
    const parsed = JSON.parse(raw);
    return Response.json(parsed);
  } catch {
    return Response.json({
      answer: raw,
      page: "Home",
      path: "/",
      section: "",
      followUp: "",
    });
  }
}
