import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Chat from "@/components/chat/chat";
import { db } from "@/db";
import { chats } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth/sessions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await getCurrentSession();

  if (!user) return redirect("/");

  const [chat] = await db
    .select()
    .from(chats)
    .where(and(eq(chats.id, id), eq(chats.userId, user.id)))
    .limit(1);

  if (!chat) return redirect("/");

  return <Chat id={id} initialMessages={chat.messages} user={user} />;
}
