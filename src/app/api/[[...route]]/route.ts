import { Hono } from "hono";
import { handle } from "hono/vercel";

import polls from "./polls";

const app = new Hono()
  .basePath("/api")
  .route("/polls", polls);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
