import { count, desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { options, polls, votes } from "@/db/schema";

export const optionVotes = db.select({
  optionId: options.id,
  label: options.label,
  pollId: options.pollId,
  voteCount: count(votes.id).as("vote_count"),
  upvoteCount: sql<number>`coalesce(count(*) filter (where ${votes.type} = 'up'), 0)`.as("upvote_count"),
  downvoteCount: sql<number>`coalesce(count(*) filter (where ${votes.type} = 'down'), 0)`.as("downvote_count"),
  isUpvoted: sql<boolean>`bool_or(${votes.userId} = ${sql.placeholder("userId")} and ${votes.type} = 'up')`.as("is_upvoted"),
  isDownvoted: sql<boolean>`bool_or(${votes.userId} = ${sql.placeholder("userId")} and ${votes.type} = 'down')`.as("is_downvoted"),

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
