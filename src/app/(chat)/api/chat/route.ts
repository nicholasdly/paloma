import { Message, appendResponseMessages, generateText, streamText } from "ai";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { createChat, getChat, updateChat } from "@/db/queries";
import { chats } from "@/db/schema";
import { generateTitlePrompt, systemPrompt } from "@/lib/ai/prompts";
import { getCurrentSession } from "@/lib/auth/sessions";
import { redis } from "@/lib/redis";
import { openai } from "@ai-sdk/openai";
import { Ratelimit } from "@upstash/ratelimit";

type ChatRequestBody = {
  id: string;
  messages: Message[];
};

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 d"),
});

async function generateTitle({ message }: { message: Message }) {
  const { text: title } = await generateText({
    model: openai("gpt-4o-mini"),
    system: generateTitlePrompt,
    prompt: JSON.stringify(message),
  });
  return title;
}

async function saveChat({
  id,
  userId,
  prompt,
}: {
  id: string;
  userId: string;
  prompt: Message;
}) {
  const existingChat = await getChat({ id, userId });
  if (existingChat) return existingChat;

  const title = await generateTitle({ message: prompt });
  const chat = await createChat({ id, userId, title, messages: [prompt] });

  return chat;
}

export async function POST(req: Request) {
  const { id, messages }: ChatRequestBody = await req.json();

  const prompt = messages.at(-1);
  if (!prompt || prompt.role !== "user") {
    return new Response("TOO_MANY_REQUESTS", { status: 429 });
  }

  const { user } = await getCurrentSession();

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success: allow } = await ratelimit.limit(user?.id ?? ip);
  if (!allow) return new Response(null, { status: 429 });

  if (!user) {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  }

  const chatPromise = saveChat({ id, userId: user.id, prompt });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: systemPrompt,
    async onFinish({ response }) {
      const chat = await chatPromise;
      const conversation = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });

      await updateChat({ id: chat.id, messages: conversation });
    },
  });

  result.consumeStream();

  return result.toDataStreamResponse();
}

export async function GET() {
  const { user } = await getCurrentSession();
  if (!user) return new Response(null, { status: 401 });

  const history = await db
    .select({
      id: chats.id,
      title: chats.title,
      createdAt: chats.createdAt,
    })
    .from(chats)
    .where(eq(chats.userId, user.id))
    .orderBy(desc(chats.createdAt));

  return new Response(JSON.stringify(history), { status: 200 });
}
