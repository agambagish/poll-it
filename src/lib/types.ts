import type { Option } from "@/db/schema";

export type OptionField = Omit<Option, "pollId"> & { votes: number };
