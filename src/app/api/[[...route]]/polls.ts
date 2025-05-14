import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";
import { fromError } from "zod-validation-error";

import type { OptionField } from "@/lib/types";

import { db } from "@/db";
import { options, polls, votes } from "@/db/schema";
import { optionVotes, orderByMap } from "@/db/utils";
import { pollSchema } from "@/lib/poll-schema";
import { tryCatch } from "@/lib/try-catch";

const app = new Hono()
  .get(
    "/",
    zValidator("query", z.object({
      sort: z.enum(["trending", "most-voted", "recent"])
        .default("trending"),
    }), (res, c) => {
      if (!res.success) {
        return c.json({
          message: fromError(res.error).toString(),
        }, StatusCodes.UNPROCESSABLE_ENTITY);
      }
    }),
    async (c) => {
      const { sort } = c.req.valid("query");

      const { data, error } = await tryCatch(
        db.select({
          id: polls.id,
          question: polls.question,
          createdAt: polls.createdAt,
          votes:
          sql<number>`(select count(*)::int from ${votes} where ${votes.pollId} = ${polls.id})`,
          options: sql<OptionField[]>`
          json_agg(
            json_build_object(
              'id', ${optionVotes.optionId},
              'label', ${optionVotes.label},
              'votes', ${optionVotes.voteCount}
            )
            order by ${optionVotes.voteCount} desc
          )
        `,
        })
          .from(polls)
          .innerJoin(optionVotes, eq(polls.id, optionVotes.pollId))
          .groupBy(polls.id)
          .orderBy(orderByMap[sort])
          .execute({ userId: "" }),
      );

      if (error) {
        return c.json([]);
      }

      return c.json(data);
    },
  )
  .get("/:pollId", clerkMiddleware(), async (c) => {
    const pollId = c.req.param("pollId");
    const auth = getAuth(c);

    const { data, error } = await tryCatch(
      db.select({
        id: polls.id,
        question: polls.question,
        createdAt: polls.createdAt,
        votes:
          sql<number>`(select count(*)::int from ${votes} where ${votes.pollId} = ${polls.id})`,
        options: sql<OptionField[]>`
          json_agg(
            json_build_object(
              'id', ${optionVotes.optionId},
              'label', ${optionVotes.label},
              'votes', ${optionVotes.voteCount},
              'upvotes', ${optionVotes.upvoteCount},
              'downvotes', ${optionVotes.downvoteCount},
              'upvoted', ${optionVotes.isUpvoted},
              'downvoted', ${optionVotes.isDownvoted}
            )
            order by ${optionVotes.voteCount} desc
          )
        `,
      })
        .from(polls)
        .innerJoin(optionVotes, eq(polls.id, optionVotes.pollId))
        .groupBy(polls.id)
        .where(eq(polls.id, Number(pollId)))
        .execute({ userId: auth?.userId }),
    );

    if (error || data.length === 0) {
      return c.json({
        message: ReasonPhrases.NOT_FOUND,
      }, StatusCodes.NOT_FOUND);
    }

    return c.json({ ...data[0] });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      pollSchema,
      (res, c) => {
        if (!res.success) {
          return c.json({
            message: fromError(res.error).toString(),
          }, StatusCodes.UNPROCESSABLE_ENTITY);
        }
      },
    ),
    async (c) => {
      const values = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({
          message: ReasonPhrases.UNAUTHORIZED,
        }, StatusCodes.UNAUTHORIZED);
      }

      const { data, error } = await tryCatch(
        db.transaction(async (tx) => {
          const [createdPoll] = await tx
            .insert(polls)
            .values({
              question: values.question,
              userId: auth.userId,
            })
            .returning({ id: polls.id });

          await tx
            .insert(options)
            .values(
              values.options.map(label => ({
                label,
                pollId: createdPoll.id,
              })),
            )
            .returning();

          return createdPoll.id;
        }),
      );

      if (error) {
        return c.json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        }, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return c.json({ pollId: data });
    },
  );

export default app;
