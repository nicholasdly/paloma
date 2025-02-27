import { ChevronUp } from "lucide-react";
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
        <h1 className="inline-flex h-8 items-center px-2 font-serif text-2xl font-medium text-primary">
          Paloma
        </h1>
      </SidebarHeader>

      <SidebarContent className="overscroll-contain">
        {user ? (
          <ChatHistory user={user} />
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
                    <ChevronUp className="ml-auto" />
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
