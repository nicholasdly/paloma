import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Chat from "@/components/chat/chat";
import { db } from "@/db";
import { chats } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth/sessions";

const getChat = async (id: string, userId?: string) => {
  if (!userId) return;

  const [chat] = await db
    .select()
    .from(chats)
    .where(and(eq(chats.id, id), eq(chats.userId, userId)))
    .limit(1);

  return chat;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, { user }] = await Promise.all([params, getCurrentSession()]);

  const chat = await getChat(id, user?.id);
  if (!chat) return redirect("/");

  return <Chat id={id} initialMessages={chat.messages} user={user} />;
}
