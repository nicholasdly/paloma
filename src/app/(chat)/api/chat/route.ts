import { Message, appendResponseMessages, generateText, streamText } from "ai";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { chats } from "@/db/schema";
import { generateTitlePrompt } from "@/lib/ai/prompts";
import { getCurrentSession } from "@/lib/auth/sessions";
import { openai } from "@ai-sdk/openai";

async function generateTitle({ message }: { message: Message }) {
  const { text: title } = await generateText({
    model: openai("gpt-4o-mini"),
    system: generateTitlePrompt,
    prompt: JSON.stringify(message),
  });
  return title;
}

async function getChat({
  id,
  userId,
  messages,
}: {
  id: string;
  userId: string;
  messages: Message[];
}) {
  const [existingChat] = await db.select().from(chats).where(eq(chats.id, id));
  if (existingChat) return existingChat;

  if (messages.length === 0 || messages.at(-1)?.role !== "user") {
    throw new Error("Last message must be a user message");
  }

  const title = await generateTitle({ message: messages.at(-1)! });
  const [chat] = await db
    .insert(chats)
    .values({
      id,
      userId,
      title,
      messages,
    })
    .returning();

  return chat!;
}

export async function POST(req: Request) {
  // TODO: Implement rate limiting

  const body = await req.json();
  const id: string = body.id;
  const messages: Message[] = body.messages;

  if (messages.length === 0 || messages.at(-1)?.role !== "user") {
    return new Response(null, { status: 400 });
  }

  const { user } = await getCurrentSession();

  if (!user) {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
    });

    return result.toDataStreamResponse();
  }

  const chatPromise = getChat({ id, userId: user.id, messages });

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    async onFinish({ response }) {
      const conversation = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });
      const chat = await chatPromise;

      await db
        .update(chats)
        .set({
          messages: conversation,
        })
        .where(eq(chats.id, chat.id));
    },
  });

  result.consumeStream();

  return result.toDataStreamResponse();
}
