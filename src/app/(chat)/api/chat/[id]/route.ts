import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { chats } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth/sessions";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { user } = await getCurrentSession();
  if (!user) return new Response(null, { status: 401 });

  const [chat] = await db
    .select({
      id: chats.id,
      messages: chats.messages,
    })
    .from(chats)
    .where(and(eq(chats.id, id), eq(chats.userId, user.id)))
    .limit(1);

  return chat
    ? new Response(JSON.stringify(chat), { status: 200 })
    : new Response(null, { status: 404 });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { user } = await getCurrentSession();
  if (!user) return new Response(null, { status: 401 });

  const [chat] = await db
    .delete(chats)
    .where(and(eq(chats.id, id), eq(chats.userId, user.id)))
    .returning({ id: chats.id });

  return chat
    ? new Response(JSON.stringify(chat), { status: 200 })
    : new Response(null, { status: 404 });
}
