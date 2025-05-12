"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeftIcon, BarChart3Icon, Share2Icon } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { PollOptionCard } from "@/components/global/poll-option-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { client } from "@/lib/hono";

export default function Page() {
  const { pollId } = useParams<{ pollId: string }>();

  const { data: poll, isLoading, isError } = useQuery({
    queryKey: ["poll"],
    queryFn: async () => {
      const apiRes = await client.api.polls[":pollId"].$get({
        param: {
          pollId,
        },
      });

      if (!apiRes.ok) {
        throw new Error("Not found");
      }

      const poll = await apiRes.json();
      return poll;
    },
    retry: false,
    gcTime: 0,
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="animate-pulse space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-3 pt-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    notFound();
  }

  const timeAgo = formatDistanceToNow(new Date(poll?.createdAt ?? ""), {
    addSuffix: true,
  });

  return (
    <main className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1 mb-2">
            <ArrowLeftIcon size={16} />
            <span>Back to polls</span>
          </Button>
        </Link>
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {poll?.question}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BarChart3Icon size={16} />
              <span>
                {poll?.votes}
                {" "}
                votes
              </span>
            </div>
            <div>
              Posted
              {" "}
              {timeAgo}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2Icon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this poll</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />
        <div className="space-y-4 py-2">
          {poll?.options.map(option => (
            <PollOptionCard
              key={option.id}
              option={option}
              pollId={poll.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
