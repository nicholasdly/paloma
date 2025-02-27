import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "nicholasdly/starter",
  description: "A minimal starter kit for Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          ibmPlexSans.variable,
          ibmPlexMono.variable,
          lora.variable,
          "overscroll-x-none font-sans antialiased",
        )}
      >
        {children}
        <Toaster
          theme="light"
          position="top-center"
          toastOptions={{ className: "font-sans !rounded" }}
          richColors
        />
      </body>
    </html>
  );
}
