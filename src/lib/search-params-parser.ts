import { createLoader, parseAsStringEnum } from "nuqs/server";

export const searchParamsParser = {
  sort: parseAsStringEnum(["trending", "most-voted", "recent"])
    .withDefault("trending")
    .withOptions({
      shallow: false,
    }),
};

export const getSearchParams = createLoader(searchParamsParser, {
  urlKeys: {
    sort: "s",
  },
});
