import { Message, UseChatHelpers } from "@ai-sdk/react";

export default function ChatMessages({
  messages,
}: {
  messages: UseChatHelpers["messages"];
}) {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col gap-6 px-5 py-4 md:max-w-3xl">
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
    <article className="ml-auto max-w-[90%] rounded border bg-muted px-3 py-2 focus-visible:outline-none focus-visible:ring-0">
      <p>{message.content}</p>
    </article>
  );
}

function AssistantMessage({ message }: { message: Message }) {
  return (
    <article className="mr-auto py-2">
      <p>{message.content}</p>
    </article>
  );
}
