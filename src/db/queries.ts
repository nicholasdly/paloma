import "server-only";
import { Message } from "ai";
import { and, desc, eq } from "drizzle-orm";
import { db } from ".";
import { chats, users } from "./schema";

export async function getUser({ email }: { email: string }) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
}

export async function createUser({
  email,
  passwordHash,
}: {
  email: string;
  passwordHash: string;
}) {
  const [user] = await db
    .insert(users)
    .values({ email, passwordHash })
    .returning();
  return user!;
}

export async function getChat({ id, userId }: { id: string; userId: string }) {
  const [chat] = await db
    .select()
    .from(chats)
    .where(and(eq(chats.id, id), eq(chats.userId, userId)))
    .limit(1);
  return chat;
}

export async function createChat({
  id,
  userId,
  title,
  messages,
}: {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
}) {
  const [chat] = await db
    .insert(chats)
    .values({ id, userId, title, messages })
    .returning();
  return chat!;
}

export async function updateChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}) {
  const [chat] = await db
    .update(chats)
    .set({ messages })
    .where(eq(chats.id, id))
    .returning();
  return chat;
}

export async function deleteChat({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const [chat] = await db
    .delete(chats)
    .where(and(eq(chats.id, id), eq(chats.userId, userId)))
    .returning();
  return chat;
}

export async function getHistory({ userId }: { userId: string }) {
  const history = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId))
    .orderBy(desc(chats.createdAt))
    .limit(100);
  return history;
}
