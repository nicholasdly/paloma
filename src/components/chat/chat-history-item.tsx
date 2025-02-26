"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chat } from "@/db/schema";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";

export default function ChatItem({ chat }: { chat: Chat }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      {pathname === `/chat/${chat.id}` ? (
        <SidebarMenuButton className="bg-muted">
          <span className="overflow-y-none text-ellipsis font-medium">
            {chat.title}
          </span>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton asChild>
          <Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
            <span>{chat.title}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
}
