"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";

import { PollCard } from "@/components/global/poll-card";
import { SearchBar } from "@/components/global/search-bar";
import { SortOptions } from "@/components/global/sort-options";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/lib/hono";
import { searchParamsParser } from "@/lib/search-params-parser";

export function PollList() {
  const [{ sort }] = useQueryStates(searchParamsParser, {
    urlKeys: {
      sort: "s",
    },
  });

  const { data: polls, isLoading } = useQuery({
    queryKey: ["polls", sort],
    queryFn: async () => {
      const apiRes = await client.api.polls.$get({
        query: {
          sort,
        },
      });

      if (!apiRes.ok) {
        return [];
      }

      const polls = await apiRes.json();
      return polls;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Skeleton className="w-full sm:w-64 h-10" />
          <div className="flex gap-2">
            <Skeleton className="w-32 h-9" />
            <Skeleton className="w-32 h-9" />
            <Skeleton className="w-32 h-9" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(item => (
            <Skeleton key={item} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="w-full sm:w-64">
          <SearchBar />
        </div>
        <SortOptions />
      </div>
      {polls?.length === 0
        ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No polls found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search terms</p>
            </div>
          )
        : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {polls?.map(poll => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </div>
          )}
    </div>
  );
}
