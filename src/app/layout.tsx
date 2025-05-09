import type { Metadata } from "next";

import { Jost } from "next/font/google";

import { metadata as _metadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import "./globals.css";

const font = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  ..._metadata,
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", font.className)}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
