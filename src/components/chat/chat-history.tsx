import { getHistory } from "@/db/queries";
import { User } from "@/db/schema";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";
import ChatHistoryItem from "./chat-history-item";

export default async function ChatHistory({ user }: { user: User }) {
  const history = await getHistory({ userId: user.id });

  if (history.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent className="px-2">
          <p className="text-sm text-muted-foreground">
            Your conversations will appear here once you start chatting!
          </p>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
            Last 30 days
          </div>
          {history.map((chat) => (
            <ChatHistoryItem key={chat.id} chat={chat} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
