import { and, desc, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { User, chats } from "@/db/schema";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";
import ChatHistoryItem from "./chat-history-item";

const month = 1000 * 60 * 60 * 24 * 30; // 30 days

export default async function ChatHistory({ user }: { user: User }) {
  const history = await db
    .select()
    .from(chats)
    .where(
      and(
        eq(chats.userId, user.id),
        gt(chats.createdAt, new Date(new Date().getTime() - month)),
      ),
    )
    .orderBy(desc(chats.createdAt))
    .limit(100);

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
