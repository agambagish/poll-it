import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader2Icon, UserCircle2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <ClerkLoading>
        <Button size="icon" variant="secondary">
          <Loader2Icon className="animate-spin text-muted-foreground" />
        </Button>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="icon">
              <UserCircle2Icon />
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button size="icon" variant="ghost">
            <UserButton />
          </Button>
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
}
