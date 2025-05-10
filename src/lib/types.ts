import type { Option, Poll } from "@/db/schema";

export type OptionField = Omit<Option, "pollId"> & { votes: number };

export type PollField = (Omit<Poll, "createdAt" | "userId"> & {
  votes: number;
  createdAt: string;
  options: OptionField[];
});

export type SortOption = "trending" | "most-voted" | "recent";
