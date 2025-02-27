import { Message, appendResponseMessages, generateText, streamText } from "ai";
import { createChat, getChat, updateChat } from "@/db/queries";
import { generateTitlePrompt, systemPrompt } from "@/lib/ai/prompts";
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

async function saveChat({
  id,
  userId,
  messages,
}: {
  id: string;
  userId: string;
  messages: Message[];
}) {
  const existingChat = await getChat({ id, userId });
  if (existingChat) return existingChat;

  if (messages.length === 0 || messages.at(-1)?.role !== "user") {
    throw new Error("Last message must be a user message");
  }

  const title = await generateTitle({ message: messages.at(-1)! });
  const chat = await createChat({ id, userId, title, messages });

  return chat;
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
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  }

  const chatPromise = saveChat({ id, userId: user.id, messages });

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
