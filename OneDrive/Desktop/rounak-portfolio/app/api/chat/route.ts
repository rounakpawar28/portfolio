import { GoogleGenAI } from "@google/genai";
import { chatbotInstructions } from "@/lib/data";

/**
 * POST /api/chat
 * Flow: browser sends { messages } → this server route adds the secret
 * GEMINI_API_KEY (from .env.local or Vercel) → Gemini replies → we return { reply }.
 * The key never leaves the server.
 */

type Msg = { from: "me" | "bot"; text: string };

// If the first model is out of quota (429) or busy (503), the next one is tried.
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "missing-key" }, { status: 500 });

  const body = await req.json().catch(() => null);
  const messages: Msg[] = Array.isArray(body?.messages) ? body.messages : [];
  const history = messages
    .filter((m) => typeof m?.text === "string" && m.text.trim())
    .slice(-12)
    .map((m) => ({ role: m.from === "bot" ? "model" : "user", parts: [{ text: m.text.slice(0, 1000) }] }));

  if (!history.length || history[history.length - 1].role !== "user") {
    return Response.json({ error: "empty" }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey });
  for (const model of MODELS) {
    try {
      const res = await ai.models.generateContent({
        model,
        contents: history,
        config: {
          systemInstruction: chatbotInstructions(),
          temperature: 0.5,
          maxOutputTokens: 500,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
      const reply = res.text?.trim();
      if (reply) return Response.json({ reply });
    } catch (err) {
      const status = (err as { status?: number }).status;
      console.error(`[hana] ${model} failed`, status ?? err);
      if (status !== 429 && status !== 503) break;
    }
  }
  return Response.json({ error: "unavailable" }, { status: 502 });
}
