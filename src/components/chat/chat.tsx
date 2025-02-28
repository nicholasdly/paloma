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
    onFinish: () => {
      if (!user) return;
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred, please try again.");
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
