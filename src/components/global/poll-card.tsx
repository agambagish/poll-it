"use client";

import { formatDistanceToNow } from "date-fns";
import { BarChartIcon, CalendarIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { PollField } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Props {
  poll: PollField;
}

export function PollCard({ poll }: Props) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const topOption = [...poll.options].sort((a, b) => b.votes - a.votes)[0];
  const topPercentage = poll.votes > 0 ? Math.round((topOption.votes / poll.votes) * 100) : 0;

  const timeAgo = formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true });

  return (
    <Link href={`/p/${poll.id}`}>
      <Card
        className={cn(
          "transition-all duration-200 h-full cursor-pointer",
          isHovering ? "shadow-md translate-y-[-2px]" : "shadow-sm",
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1 text-xl">{poll.question}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs">
            <CalendarIcon size={14} />
            <span>{timeAgo}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium line-clamp-1">{topOption.label}</span>
                <span className="font-semibold">
                  {topPercentage}
                  %
                </span>
              </div>
              <Progress value={topPercentage} className="h-2" />
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {poll.options.slice(0, 2).map((option, i) => (
                <span
                  key={option.id}
                  className={cn(
                    "text-xs rounded-full px-2 py-0.5 line-clamp-1",
                    i === 0 ? "bg-primary text-white" : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {option.label}
                </span>
              ))}
              {poll.options.length > 2 && (
                <span className="text-xs rounded-full px-2 py-0.5 bg-muted text-muted-foreground">
                  +
                  {poll.options.length - 2}
                  {" "}
                  more
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="py-3">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquareIcon size={14} />
              <span>
                {poll.options.length}
                {" "}
                options
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BarChartIcon size={14} />
              <span>
                {poll.votes}
                {" "}
                votes
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
