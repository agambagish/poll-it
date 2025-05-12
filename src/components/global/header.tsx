import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ChartColumnBigIcon, Loader2Icon, UserCircle2Icon } from "lucide-react";
import Link from "next/link";

import { GithubBadge } from "@/components/global/github-badge";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="container mx-auto px-4 max-w-7xl">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex space-x-2">
          <Link href="/" className="items-center space-x-2 flex">
            <ChartColumnBigIcon />
            <span className="font-bold inline-block">
              Poll-it
            </span>
          </Link>
          <GithubBadge />
        </div>
        <nav>
          <ClerkLoading>
            <Button variant="secondary" size="icon">
              <Loader2Icon className="animate-spin text-muted-foreground" />
            </Button>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <Button variant="secondary" size="icon">
                <UserButton />
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="secondary" size="icon">
                  <UserCircle2Icon />
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </nav>
      </div>
    </header>
  );
}
