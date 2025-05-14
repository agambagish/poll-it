import { useQueryStates } from "nuqs";

import { pollCreationParamsParser } from "@/lib/poll-creation-params-parser";

export function usePollCreationParams() {
  const [{ step }, setParams] = useQueryStates(pollCreationParamsParser, {
    urlKeys: {
      step: "s",
    },
  });

  return { step, setParams };
}
