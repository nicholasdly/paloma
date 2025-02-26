import { SendIcon } from "lucide-react";
import { useRef } from "react";
import { UseChatHelpers } from "@ai-sdk/react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function ChatForm({
  input,
  handleInputChange,
  handleSubmit,
}: {
  input: UseChatHelpers["input"];
  handleInputChange: UseChatHelpers["handleInputChange"];
  handleSubmit: UseChatHelpers["handleSubmit"];
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resetInput = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "98px";
  };

  const resizeInput = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(event);
    resizeInput();
  };

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event);
    resetInput();
  };

  return (
    <form
      className="sticky bottom-0 z-10 mx-auto flex w-full bg-background px-4 pb-4 md:max-w-3xl md:pb-6"
      onSubmit={onSubmit}
    >
      <div className="relative w-full">
        <Textarea
          ref={textareaRef}
          className="resize-none bg-muted pb-10"
          value={input}
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || event.shiftKey) return;
            event.preventDefault();
            onSubmit();
          }}
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="absolute bottom-0 right-0 z-10 m-2 size-[30px]"
        >
          <SendIcon />
        </Button>
      </div>
    </form>
  );
}
