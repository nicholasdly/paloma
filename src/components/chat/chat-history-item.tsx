"use client";

import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Chat } from "@/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: deleteChat, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/chat/${id}`, { method: "DELETE" });
      return await response.json();
    },
    onMutate: () => {
      return toast.loading("Deleting chat...");
    },
    onError: (_error, _variables, context) => {
      toast.error("Something went wrong! Try again later.", { id: context });
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      toast.success("Successfully deleted chat.", { id: context });
      if (!showOnHover) router.refresh();
    },
  });

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
            disabled={isPending}
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
            <AlertDialogAction onClick={() => deleteChat()}>
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
