import { Message, UseChatHelpers } from "@ai-sdk/react";
import { Markdown } from "../custom/markdown";

export default function ChatMessages({
  messages,
}: {
  messages: UseChatHelpers["messages"];
}) {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col gap-6 px-6 py-4 md:max-w-3xl">
      {messages.map((message) => {
        switch (message.role) {
          case "user":
            return <UserMessage key={message.id} message={message} />;
          case "assistant":
            return <AssistantMessage key={message.id} message={message} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function UserMessage({ message }: { message: Message }) {
  return (
    <article className="ml-auto max-w-[90%] rounded border bg-accent px-3 py-2 text-primary">
      <p className="whitespace-pre-line">{message.content}</p>
    </article>
  );
}

function AssistantMessage({ message }: { message: Message }) {
  return (
    <article className="no-katex-margins mr-auto flex max-w-full flex-col gap-4 py-2">
      <Markdown>{message.content}</Markdown>
    </article>
  );
}
