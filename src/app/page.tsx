import type { SearchParams } from "nuqs/server";

import { PollList } from "@/components/global/poll-list";
import { client } from "@/lib/hono";
import { getSearchParams } from "@/lib/search-params-parser";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const _searchParams = await searchParams;
  const { sort } = await getSearchParams(_searchParams);

  const apiRes = await client.api.polls.$get({
    query: {
      sort,
    },
  });

  const polls = await apiRes.json();

  return (
    <main className="container mx-auto py-8 px-4 max-w-7xl">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          <span className="text-primary">Poll-</span>
          <span>it</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create polls and see results in real-time with our Reddit-style voting platform
        </p>
      </section>
      <PollList polls={polls} />
    </main>
  );
}
