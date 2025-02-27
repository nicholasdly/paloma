"use client";

import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Chat } from "@/db/schema";
import { deleteChat } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

function ChatHistoryItemActions({
  id,
  showOnHover,
}: {
  id: string;
  showOnHover: boolean;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const onSelect = () => {
    startTransition(async () => {
      const { success, error } = await deleteChat(id);
      if (success) {
        router.refresh();
        toast.success("Successfully deleted chat!");
      } else {
        toast.error(error);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            className="border border-transparent text-primary"
            showOnHover={showOnHover}
          >
            <EllipsisVerticalIcon className="h-4 w-4" />
            <span className="sr-only">Manage</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              chat and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSelect}>
              Delete chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function ChatHistoryItem({ chat }: { chat: Chat }) {
  const { setOpenMobile } = useSidebar();

  const pathname = usePathname();
  const isActive = pathname === `/chat/${chat.id}`;

  return (
    <SidebarMenuItem>
      {isActive ? (
        <SidebarMenuButton className="border text-primary">
          <span>{chat.title}</span>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton className="border border-transparent" asChild>
          <Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
            <span>{chat.title}</span>
          </Link>
        </SidebarMenuButton>
      )}
      <ChatHistoryItemActions id={chat.id} showOnHover={!isActive} />
    </SidebarMenuItem>
  );
}
