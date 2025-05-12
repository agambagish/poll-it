import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { Jost } from "next/font/google";

import { Header } from "@/components/global/header";
import { metadata as _metadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

import "./globals.css";

import { Providers } from "@/providers";

const font = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  ..._metadata,
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("antialiased", font.className)}
          suppressHydrationWarning
        >
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
