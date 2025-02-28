"use client";

import { LoaderIcon } from "lucide-react";
import { Chat, User } from "@/db/schema";
import { groupChats } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "../ui/sidebar";
import ChatHistoryItem from "./chat-history-item";

export default function ChatHistory({ user }: { user: User }) {
  const { data, status } = useQuery<Chat[]>({
    queryKey: ["history", user.id],
    queryFn: async () => {
      const response = await fetch(`/api/chat`);
      return await response.json();
    },
  });

  if (status === "pending") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="mt-6 flex items-center justify-center text-sidebar-foreground/50">
            <LoaderIcon className="size-5 animate-spin" />
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (status === "error") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <p className="px-2 py-1 text-sidebar-foreground/50">
            Something went wrong! Try again later.
          </p>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (data.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <p className="px-2 py-1 text-sidebar-foreground/50">
            Your conversations will appear here once you start chatting!
          </p>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  const groups = groupChats(data);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="space-y-5">
        {groups.today.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Today
            </div>
            {groups.today.map((chat) => (
              <ChatHistoryItem key={chat.id} userId={user.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.yesterday.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Yesterday
            </div>
            {groups.yesterday.map((chat) => (
              <ChatHistoryItem key={chat.id} userId={user.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.week.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Previous 7 days
            </div>
            {groups.week.map((chat) => (
              <ChatHistoryItem key={chat.id} userId={user.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.month.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Previous 30 days
            </div>
            {groups.month.map((chat) => (
              <ChatHistoryItem key={chat.id} userId={user.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}

        {groups.older.length > 0 && (
          <SidebarMenu>
            <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
              Older
            </div>
            {groups.older.map((chat) => (
              <ChatHistoryItem key={chat.id} userId={user.id} chat={chat} />
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
