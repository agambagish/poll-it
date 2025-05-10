import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const polls = pgTable("polls", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  question: text().notNull(),
  userId: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const options = pgTable("options", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: text().notNull(),
  pollId: integer()
    .notNull()
    .references(() => polls.id, {
      onDelete: "cascade",
    }),
});

export const voteTypeEnum = pgEnum("vote_type", ["up", "down"]);

export const votes = pgTable(
  "votes",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text().notNull(),
    optionId: integer()
      .notNull()
      .references(() => options.id, { onDelete: "cascade" }),
    pollId: integer()
      .notNull()
      .references(() => polls.id, { onDelete: "cascade" }),
    type: voteTypeEnum().notNull(),
  },
  table => ({
    oneVotePerUserPerPoll: uniqueIndex().on(table.userId, table.pollId),
  }),
);

export const pollsRelations = relations(polls, ({ many }) => ({
  options: many(options),
}));

export const optionsRelations = relations(options, ({ one, many }) => ({
  poll: one(polls, {
    fields: [options.pollId],
    references: [polls.id],
  }),
  votes: many(votes),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  poll: one(polls, {
    fields: [votes.pollId],
    references: [polls.id],
  }),
  option: one(options, {
    fields: [votes.optionId],
    references: [options.id],
  }),
}));

export type Poll = typeof polls.$inferSelect;
export type Option = typeof options.$inferSelect;
export type VoteType = (typeof voteTypeEnum.enumValues)[number];
export type Vote = typeof votes.$inferSelect;
