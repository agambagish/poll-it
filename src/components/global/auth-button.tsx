"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader2Icon, PlusCircleIcon, UserCircle2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AuthButton() {
  return (
    <>
      <ClerkLoading>
        <Button variant="secondary" size="icon">
          <Loader2Icon className="animate-spin text-muted-foreground" />
        </Button>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <Button variant="secondary" size="icon">
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Create a poll"
                  href="/create-a-poll"
                  labelIcon={<PlusCircleIcon className="size-4" />}
                />
              </UserButton.MenuItems>
            </UserButton>
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
    </>
  );
}
