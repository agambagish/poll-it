import { useQueryStates } from "nuqs";

import { homepageParamsParser } from "@/lib/homepage-params-parser";

export function useHomepageParams() {
  const [{ sort }, setParams] = useQueryStates(homepageParamsParser, {
    urlKeys: {
      sort: "s",
    },
  });

  return { sort, setParams };
}
