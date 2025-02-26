import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
