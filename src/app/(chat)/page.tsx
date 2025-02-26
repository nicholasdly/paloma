import Chat from "@/components/chat/chat";
import { getCurrentSession } from "@/lib/auth/sessions";

export default async function Page() {
  const { user } = await getCurrentSession();

  return <Chat id={crypto.randomUUID()} initialMessages={[]} user={user} />;
}
