import { ChevronUp, PlusIcon } from "lucide-react";
import Link from "next/link";
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
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export async function ChatSidebar() {
  const { user } = await getCurrentSession();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h1 className="px-2 font-sans text-xl font-semibold">Paloma</h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <PlusIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">New Chat</TooltipContent>
          </Tooltip>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {!user && (
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
                  <SidebarMenuButton>
                    {user.email}
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
