import Chat from "@/components/chat/chat";
import { getCurrentSession } from "@/lib/auth/sessions";

export default async function Page() {
  const { user } = await getCurrentSession();

  return <Chat user={user} />;
}
