import { createLoader, parseAsStringEnum } from "nuqs/server";

export const pollCreationParamsParser = {
  step: parseAsStringEnum(["intro", "question", "options"])
    .withDefault("intro")
    .withOptions({
      shallow: false,
    }),
};

export const getPollCreationParams = createLoader(pollCreationParamsParser, {
  urlKeys: {
    step: "s",
  },
});
