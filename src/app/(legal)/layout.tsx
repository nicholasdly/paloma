import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex flex-col items-center justify-between gap-1 border-b bg-background p-2 sm:flex-row sm:gap-2">
        <Link
          href="/"
          className="pl-2 font-serif text-2xl font-medium text-primary"
        >
          Paloma
        </Link>
        <div className="flex gap-2">
          <Button className="text-sm" size="sm" variant="link" asChild>
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button className="text-sm" size="sm" variant="link" asChild>
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto mb-16 mt-6 flex max-w-2xl flex-col gap-4 p-4">
        {children}
      </main>
    </>
  );
}
