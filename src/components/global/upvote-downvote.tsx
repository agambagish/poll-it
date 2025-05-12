import { SignInButton, useAuth } from "@clerk/nextjs";
import NumberFlow from "@number-flow/react";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const UPVOTE_COLOR = "bg-primary";
const DOWNVOTE_COLOR = "bg-destructive";

interface Props {
  upvotes: number;
  downvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  upvoteIncrement?: number;
  downvoteIncrement?: number;
  onVoteChange: (newState: {
    upvotes: number;
    downvotes: number;
    upvoted: boolean;
    downvoted: boolean;
  }) => void;
}

export function UpvoteDownvote({
  downvoted,
  downvoteIncrement = 1,
  downvotes,
  onVoteChange,
  upvoted,
  upvoteIncrement = 1,
  upvotes,
}: Props) {
  const { isSignedIn } = useAuth();

  const handleUpvote = () => {
    if (!isSignedIn) {
      return;
    }

    if (upvoted) {
      onVoteChange({
        downvoted: false,
        downvotes,
        upvoted: false,
        upvotes: upvotes - upvoteIncrement,
      });
    }
    else {
      onVoteChange({
        downvoted: false,
        downvotes: downvoted ? downvotes - downvoteIncrement : downvotes,
        upvoted: true,
        upvotes: upvotes + upvoteIncrement,
      });
    }
  };

  const handleDownvote = () => {
    if (!isSignedIn) {
      return;
    }

    if (downvoted) {
      onVoteChange({
        downvoted: false,
        downvotes: downvotes - downvoteIncrement,
        upvoted: false,
        upvotes,
      });
    }
    else {
      onVoteChange({
        downvoted: true,
        downvotes: downvotes + downvoteIncrement,
        upvoted: false,
        upvotes: upvoted ? upvotes - upvoteIncrement : upvotes,
      });
    }
  };

  const totalVotes = upvotes - downvotes;

  return (
    <div
      className={cn(
        "flex w-fit flex-row items-center gap-0 rounded-full border p-1",
        upvoted && UPVOTE_COLOR,
        downvoted && DOWNVOTE_COLOR,
      )}
    >
      <button
        type="button"
        onClick={handleUpvote}
        className="cursor-pointer rounded-full p-1 hover:bg-zinc-800/30"
      >
        {isSignedIn
          ? (
              <ArrowBigUpIcon
                size={24}
                className={cn("text-white", upvoted && "fill-white")}
              />
            )
          : (
              <SignInButton mode="modal">
                <ArrowBigUpIcon
                  size={24}
                  className="text-white"
                />
              </SignInButton>
            )}
      </button>
      <span className="min-w-8 p-1 text-center text-white">
        <NumberFlow
          format={{ notation: "compact" }}
          value={totalVotes}
          className="tabular-nums"
        />
      </span>
      <button
        type="button"
        onClick={handleDownvote}
        className="cursor-pointer rounded-full p-1 hover:bg-zinc-800/30"
      >
        {isSignedIn
          ? (
              <ArrowBigDownIcon
                size={24}
                className={cn("text-white", downvoted && "fill-white")}
              />
            )
          : (
              <SignInButton mode="modal">
                <ArrowBigDownIcon
                  size={24}
                  className="text-white"
                />
              </SignInButton>
            )}
      </button>
    </div>
  );
}
