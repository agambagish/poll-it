import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";

import { db } from "@/db";
import { votes } from "@/db/schema";
import { tryCatch } from "@/lib/try-catch";

const app = new Hono()
  .put(
    "/",
    clerkMiddleware(),
    zValidator("json", z.object({
      pollId: z.number().gte(1),
      optionId: z.number().gte(1),
      type: z.enum(["up", "down"]),
    })),
    async (c) => {
      const { pollId, optionId, type } = c.req.valid("json");
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({
          message: ReasonPhrases.UNAUTHORIZED,
        }, StatusCodes.UNAUTHORIZED);
      }

      const { data, error } = await tryCatch(
        db.insert(votes)
          .values({
            pollId,
            optionId,
            type,
            userId: auth.userId,
          })
          .onConflictDoUpdate({
            target: [votes.optionId, votes.userId],
            set: {
              type,
            },
          }),
      );

      if (error) {
        return c.json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        }, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return c.json(data);
    },
  );

export default app;
