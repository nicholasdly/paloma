import Link from "next/link";

export default function ChatWelcome() {
  return (
    <article className="mx-auto mt-8 flex flex-col gap-5 text-pretty md:max-w-xl">
      <h2 className="font-serif text-2xl font-medium text-primary">
        Welcome to Paloma 👋
      </h2>
      <p>
        Paloma is a demonstration of a chatbot built with Next.js, PostgreSQL,
        and the AI SDK by Vercel. It uses modern React features, including both
        client and server components, and runs its own self-hosted
        authentication.
      </p>
      <p className="italic">
        Due to the nature of being a demonstration, Paloma is heavily rate
        limited.
      </p>
      <p className="text-primary">
        —{" "}
        <Link
          className="underline-offset-2 hover:underline"
          href="https://nicholasly.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nicholas Ly
        </Link>
      </p>
    </article>
  );
}
