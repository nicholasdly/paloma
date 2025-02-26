import { redirect } from "next/navigation";
import Chat from "@/components/chat/chat";
import { getChat } from "@/db/queries";
import { getCurrentSession } from "@/lib/auth/sessions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, { user }] = await Promise.all([params, getCurrentSession()]);

  const chat = user ? await getChat({ id, userId: user.id }) : undefined;
  if (!chat) return redirect("/");

  return <Chat id={id} initialMessages={chat.messages} user={user} />;
}
