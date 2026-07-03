import Anthropic from "@anthropic-ai/sdk";
import { JASMINE_SYSTEM_PROMPT } from "@/lib/jasmine";

// Opus 4.8 per current API guidance. Cheap/fast alternative if cost ever
// matters at volume: "claude-haiku-4-5".
const MODEL = "claude-opus-4-8";

// Widget replies are 1-3 sentences by design; the cap is intentional.
const MAX_REPLY_TOKENS = 300;
const MAX_MESSAGE_CHARS = 1000;
const MAX_HISTORY_MESSAGES = 40;

const client = new Anthropic();

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidHistory(body: unknown): body is { messages: ChatMessage[] } {
  if (typeof body !== "object" || body === null) return false;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return false;
  return messages.every(
    (m) =>
      typeof m === "object" &&
      m !== null &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_CHARS,
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  if (!isValidHistory(body)) {
    return new Response("Bad request", { status: 400 });
  }

  const history = body.messages.slice(-MAX_HISTORY_MESSAGES);
  if (history[history.length - 1].role !== "user") {
    return new Response("Bad request", { status: 400 });
  }

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_REPLY_TOKENS,
    system: JASMINE_SYSTEM_PROMPT,
    messages: history,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    start(controller) {
      stream.on("text", (delta) => {
        controller.enqueue(encoder.encode(delta));
      });
      stream.on("end", () => controller.close());
      stream.on("error", (err) => {
        console.error("chat stream error:", err);
        controller.error(err);
      });
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
