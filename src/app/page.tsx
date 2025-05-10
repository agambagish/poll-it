import type { SearchParams } from "nuqs/server";

import { searchParamsParser } from "@/lib/search-params-parser";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const _searchParams = await searchParams;
  const { sort } = await searchParamsParser(_searchParams);

  return (
    <>{sort}</>
  );
}
