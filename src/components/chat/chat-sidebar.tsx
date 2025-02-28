import { ChevronUpIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getCurrentSession } from "@/lib/auth/sessions";
import { HydrationBoundary } from "@tanstack/react-query";
import HelpButton from "../custom/help-button";
import LogoutButton from "../custom/logout-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ChatHistory from "./chat-history";

export async function ChatSidebar() {
  const { user } = await getCurrentSession();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between">
          <h1 className="ml-2 font-serif text-2xl font-medium text-primary">
            Paloma
          </h1>
          <HelpButton />
        </div>
      </SidebarHeader>

      <SidebarContent className="overscroll-contain">
        {user ? (
          <HydrationBoundary>
            <ChatHistory user={user} />
          </HydrationBoundary>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent className="p-2">
              <p className="text-sidebar-foreground/50">
                Login to save and revisit previous chats!
              </p>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {user && (
        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="font-medium text-primary">
                    <span className="truncate font-serif">{user.email}</span>
                    <ChevronUpIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
