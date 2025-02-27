import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth/sessions";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default async function ChatHeader() {
  const { user } = await getCurrentSession();

  return (
    <header className="g-background sticky top-0 flex items-center justify-between border-b bg-background p-2">
      <div className="flex items-center gap-2">
        <Tooltip delayDuration={400}>
          <TooltipTrigger asChild>
            <SidebarTrigger variant="outline" />
          </TooltipTrigger>
          <TooltipContent align="start">Toggle Sidebar</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={400}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <PlusIcon />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start">New Chat</TooltipContent>
        </Tooltip>
      </div>

      {!user && (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
