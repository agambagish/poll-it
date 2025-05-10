import type { PollField } from "@/lib/types";

import { PollCard } from "@/components/global/poll-card";
import { SearchBar } from "@/components/global/search-bar";
import { SortOptions } from "@/components/global/sort-options";

interface Props {
  polls: PollField[];
}

export function PollList({ polls }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="w-full sm:w-64">
          <SearchBar />
        </div>
        <SortOptions />
      </div>
      {polls.length === 0
        ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No polls found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search terms</p>
            </div>
          )
        : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {polls.map(poll => (
                <PollCard key={poll.id} poll={poll} />
              ))}
            </div>
          )}
    </div>
  );
}
