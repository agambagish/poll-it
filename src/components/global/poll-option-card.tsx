"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { useEffect, useState } from "react";

import type { OptionField } from "@/lib/types";

import { UpvoteDownvote } from "@/components/global/upvote-downvote";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  option: OptionField;
  disabled?: boolean;
}

export function PollOptionCard({
  option,
  disabled,
}: Props) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const [upvotes, setUpvotes] = useState<number>(0);
  const [downvotes, setDownvotes] = useState<number>(0);

  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);

  useEffect(() => {
    setUpvotes(option.upvotes);
    setDownvotes(option.downvotes);
    setUpvoted(option.upvoted);
    setDownvoted(option.downvoted);
  }, [
    option.downvoted,
    option.downvotes,
    option.upvoted,
    option.upvotes,
  ]);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 rounded-lg border p-4 transition-all",
        isHovering && !disabled ? "hover:border-primary shadow-sm" : "border-border",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-card-foreground">{option.label}</h3>
        <Button size="icon" variant="ghost" className="cursor-pointer">
          <EllipsisVerticalIcon />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-muted-foreground">
          {option.votes}
          {" "}
          votes
        </span>
        <UpvoteDownvote
          upvotes={upvotes}
          downvotes={downvotes}
          upvoted={upvoted}
          downvoted={downvoted}
          onVoteChange={(state) => {
            setUpvotes(state.upvotes);
            setUpvoted(state.upvoted);
            setDownvotes(state.downvotes);
            setDownvoted(state.downvoted);
          }}
        />
      </div>
    </div>
  );
}
