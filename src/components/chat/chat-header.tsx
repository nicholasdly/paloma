import Link from "next/link";
import { User } from "@/db/schema";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ChatHeader({ user }: { user: User | null }) {
  return (
    <header className="sticky top-0 flex items-center justify-between border-b bg-background p-1.5 md:px-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger variant="outline" />
        </TooltipTrigger>
        <TooltipContent align="start">Toggle Sidebar</TooltipContent>
      </Tooltip>

      {!user && (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
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
