import { getHistory } from "@/db/queries";
import { User } from "@/db/schema";
import { groupChats } from "@/lib/utils";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";
import ChatHistoryItem from "./chat-history-item";

export default async function ChatHistory({ user }: { user: User }) {
  const history = await getHistory({ userId: user.id });
  const groups = groupChats(history);

  if (history.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <p className="text-sidebar-foreground/50">
            Your conversations will appear here once you start chatting!
          </p>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="space-y-5">
        {groups.today.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Today
            </div>
            {groups.today.map((chat) => (
              <ChatHistoryItem key={chat.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.yesterday.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Yesterday
            </div>
            {groups.yesterday.map((chat) => (
              <ChatHistoryItem key={chat.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.week.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Previous 7 days
            </div>
            {groups.week.map((chat) => (
              <ChatHistoryItem key={chat.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.month.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Previous 30 days
            </div>
            {groups.month.map((chat) => (
              <ChatHistoryItem key={chat.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.older.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Older
            </div>
            {groups.older.map((chat) => (
              <ChatHistoryItem key={chat.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
