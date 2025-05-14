import { createLoader, parseAsStringEnum } from "nuqs/server";

export const homepageParamsParser = {
  sort: parseAsStringEnum(["trending", "most-voted", "recent"])
    .withDefault("trending")
    .withOptions({
      shallow: false,
    }),
};

export const getHomepageParams = createLoader(homepageParamsParser, {
  urlKeys: {
    sort: "s",
  },
});
