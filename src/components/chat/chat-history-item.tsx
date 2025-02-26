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
        <SidebarMenuButton className="border bg-muted/60">
          <span>{chat.title}</span>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton className="border border-transparent" asChild>
          <Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
            <span>{chat.title}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
}
