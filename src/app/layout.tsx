import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { Jost } from "next/font/google";

import { Header } from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";
import { metadata as _metadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";

import "./globals.css";

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
            <Toaster
              richColors
              toastOptions={{ className: font.className }}
            />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
