import type { Option, Poll } from "@/db/schema";
import type { PollSchema } from "@/lib/poll-schema";

export type OptionField = Omit<Option, "pollId"> & {
  votes: number;
  upvotes: number;
  downvotes: number;
  upvoted: boolean;
  downvoted: boolean;
};

export type PollField = (Omit<Poll, "createdAt" | "userId"> & {
  votes: number;
  createdAt: string;
  options: OptionField[];
});

export type SortOption = "trending" | "most-voted" | "recent";

export interface PollCreationStep {
  step: "intro" | "question" | "options";
  fields: (keyof PollSchema)[];
}
