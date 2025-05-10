import { count, desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { options, polls, votes } from "@/db/schema";

export const optionVotes = db.select({
  optionId: options.id,
  label: options.label,
  pollId: options.pollId,
  voteCount: count(votes.id).as("vote_count"),
})
  .from(options)
  .leftJoin(votes, eq(options.id, votes.optionId))
  .groupBy(options.id)
  .as("option_votes");

export const orderByMap = {
  "most-voted":
        desc(sql<number>`(select count(*) from ${votes} where ${votes.pollId} = ${polls.id})`),
  "recent": desc(polls.createdAt),
  "trending": desc(
    sql`(${sql<number>`(select count(*) from ${votes} where ${votes.pollId} = ${polls.id})`} / EXTRACT(EPOCH FROM NOW() - ${polls.createdAt}))`,
  ),
};
