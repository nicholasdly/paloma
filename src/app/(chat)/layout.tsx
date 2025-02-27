import ChatHeader from "@/components/chat/chat-header";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <div className="flex min-h-svh w-full flex-col">
        <ChatHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}
