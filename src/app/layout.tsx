import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { Jost } from "next/font/google";

import { metadata as _metadata } from "@/lib/metadata";

import "./globals.css";

import { cn } from "@/lib/utils";

const font = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  ..._metadata,
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn("antialiased", font.className)}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
