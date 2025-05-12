import { Hono } from "hono";
import { handle } from "hono/vercel";

import polls from "./polls";
import votes from "./votes";

const app = new Hono()
  .basePath("/api")
  .route("/polls", polls)
  .route("/votes", votes);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
