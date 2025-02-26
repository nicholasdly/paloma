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
      <SidebarHeader className="flex h-12 justify-center">
        <h1 className="px-2 font-serif text-xl font-semibold text-primary">
          Paloma
        </h1>
      </SidebarHeader>

      <SidebarContent>
        {user ? (
          <SidebarGroup>
            <ChatHistory user={user} />
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent className="px-2">
              <p className="text-sm text-muted-foreground">
                Login to save and revisit previous chats!
              </p>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="font-semibold">
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
