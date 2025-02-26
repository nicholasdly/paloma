"use client";

import { User } from "@/db/schema";
import { useChat } from "@ai-sdk/react";
import ChatHeader from "./chat-header";
import ChatForm from "./chat-input";
import ChatMessages from "./chat-messages";

export default function Chat({ user }: { user: User | null }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-svh flex-col">
      <ChatHeader user={user} />
      <ChatMessages messages={messages} />
      <ChatForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
