"use client";

import { toast } from "sonner";
import { User } from "@/db/schema";
import { Message, useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import ChatForm from "./chat-form";
import ChatMessages from "./chat-messages";

export default function Chat({
  id,
  initialMessages,
  user,
}: {
  id: string;
  initialMessages: Message[];
  user: User | null;
}) {
  const queryClient = useQueryClient();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id,
    initialMessages,
    sendExtraMessageFields: true,
    experimental_throttle: 100,
    generateId: () => crypto.randomUUID(),
    onResponse: (response) => {
      if (response.ok) return;
      return response.status === 429
        ? void toast.error("Too many requests! Try again later.")
        : void toast.error("An error occurred, please try again.");
    },
    onFinish: () => {
      if (!user) return;
      queryClient.invalidateQueries({ queryKey: ["history", user.id] });
    },
  });

  return (
    <main className="flex w-full flex-1 flex-col">
      <ChatMessages messages={messages} />
      <ChatForm
        id={id}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        user={user}
      />
    </main>
  );
}
