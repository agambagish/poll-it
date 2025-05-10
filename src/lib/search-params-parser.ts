import { createLoader, parseAsStringEnum } from "nuqs/server";

export const searchParamsParser = createLoader(
  {
    sort: parseAsStringEnum(["trending", "most-voted", "recent"])
      .withDefault("trending")
      .withOptions({
        shallow: false,
      }),
  },
  {
    urlKeys: {
      sort: "s",
    },
  },
);
