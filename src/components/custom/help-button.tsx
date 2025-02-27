import { ExternalLinkIcon, HelpCircleIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function HelpButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircleIcon />
          <span className="sr-only">Help</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center justify-between hover:cursor-pointer"
            href="mailto:nichdly@gmail.com"
          >
            Contact support <MailIcon />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center justify-between hover:cursor-pointer"
            href="/terms"
            target="_blank"
          >
            Terms of service <ExternalLinkIcon />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center justify-between hover:cursor-pointer"
            href="/privacy"
            target="_blank"
          >
            Privacy policy <ExternalLinkIcon />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
