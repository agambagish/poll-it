import type { SearchParams } from "nuqs/server";

import { client } from "@/lib/hono";
import { searchParamsParser } from "@/lib/search-params-parser";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const _searchParams = await searchParams;
  const { sort } = await searchParamsParser(_searchParams);

  const apiRes = await client.api.polls.$get({
    query: {
      sort,
    },
  });

  const polls = await apiRes.json();

  return (
    <code>{JSON.stringify(polls)}</code>
  );
}
