import { NextRequest } from "next/server";

// Use the Node.js runtime so we can reach a local Ollama at localhost.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL?.replace(/\/$/, "") || "http://localhost:11434";
// The model we want. Falls back to this if the configured one isn't installed.
const PREFERRED_MODEL = "qwen2.5-coder:3b";
const CONFIGURED_MODEL = process.env.OLLAMA_MODEL || PREFERRED_MODEL;

const SYSTEM_PROMPT = `You are the Varcheck studio assistant.
Varcheck is a software and design studio led by Sumit Wod (full-stack developer, UI/UX designer, product builder, based in India).
Services: Software Engineering, UI/UX Design, Mobile Apps (React Native & Flutter), and Design Systems.
Contact: hello@varcheck.in. Profile: https://sumitwod.vercel.app.
Tone: confident, self-aware, lightly satirical. Short, declarative sentences. Never use buzzwords like "innovative" or "passionate". Never grovel. Be genuinely helpful and answer technical questions directly when asked.`;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Ollama tag names look like "qwen2.5-coder:3b" or "llama3.2:latest".
// A name without a tag should match the ":latest" variant.
function modelMatches(wanted: string, available: string[]): boolean {
  if (available.includes(wanted)) return true;
  if (!wanted.includes(":")) return available.includes(`${wanted}:latest`);
  return false;
}

/**
 * Ask Ollama which models exist, then choose the best one to use:
 *   1. the configured model, if installed
 *   2. qwen2.5-coder:3b, if installed
 *   3. the first installed model
 * Returns the chosen model name, or an error describing what to do.
 */
async function resolveModel(): Promise<
  { model: string } | { error: string; status: number }
> {
  let tagsRes: Response;
  try {
    tagsRes = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return {
      error: `Could not reach Ollama at ${OLLAMA_BASE_URL}. Make sure Ollama is running (ollama serve).`,
      status: 502,
    };
  }

  if (!tagsRes.ok) {
    // Can't list models — try the configured one and let the chat call report any issue.
    return { model: CONFIGURED_MODEL };
  }

  const data = (await tagsRes.json().catch(() => null)) as
    | { models?: { name?: string }[] }
    | null;
  const available = (data?.models ?? [])
    .map((m) => m?.name)
    .filter((n): n is string => typeof n === "string");

  if (available.length === 0) {
    return {
      error: `No models are installed in Ollama. Run: ollama pull ${PREFERRED_MODEL}`,
      status: 502,
    };
  }

  if (modelMatches(CONFIGURED_MODEL, available)) return { model: CONFIGURED_MODEL };

  // Configured model missing — prefer qwen2.5-coder, else the first available.
  const qwen =
    available.find((m) => m === PREFERRED_MODEL) ||
    available.find((m) => m.startsWith("qwen2.5-coder"));
  return { model: qwen ?? available[0] };
}

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const resolved = await resolveModel();
  if ("error" in resolved) {
    return Response.json({ error: resolved.error }, { status: resolved.status });
  }
  const model = resolved.model;

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...incoming
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
      .slice(-20), // keep context bounded for a small model
  ];

  let upstream: Response;
  try {
    upstream = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        options: { temperature: 0.7 },
      }),
    });
  } catch {
    return Response.json(
      {
        error: `Could not reach Ollama at ${OLLAMA_BASE_URL}. Make sure Ollama is running.`,
      },
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return Response.json(
      {
        error: `Ollama returned ${upstream.status}. ${detail || `Is the model "${model}" available?`}`,
      },
      { status: 502 }
    );
  }

  // Transform Ollama's NDJSON stream into a plain UTF-8 text stream of tokens.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();

      if (value) {
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep the trailing partial line

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const json = JSON.parse(trimmed);
            const token: string | undefined = json?.message?.content;
            if (token) controller.enqueue(encoder.encode(token));
          } catch {
            // ignore malformed/partial JSON lines
          }
        }
      }

      if (done) {
        if (buffer.trim()) {
          try {
            const json = JSON.parse(buffer.trim());
            const token: string | undefined = json?.message?.content;
            if (token) controller.enqueue(encoder.encode(token));
          } catch {
            // ignore
          }
        }
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Model": model,
    },
  });
}
