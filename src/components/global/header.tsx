import { ChartColumnBigIcon } from "lucide-react";
import Link from "next/link";

import { AuthButton } from "@/components/global/auth-button";
import { GithubBadge } from "@/components/global/github-badge";
import { ModeToggle } from "@/components/global/mode-toggle";

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
        <nav className="flex space-x-2">
          <AuthButton />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
