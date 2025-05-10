/* eslint-disable node/no-process-env */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  emptyStringAsUndefined: true,
  onValidationError: (issues) => {
    console.error(
      "❌ Invalid env variables:",
      JSON.stringify(issues.map(
        i => ({ [i.path?.[0] as string]: i.message.toLowerCase() }),
      ), null, 2),
    );
    process.exit(1);
  },
  onInvalidAccess: () => {
    throw new Error(
      "❌ Attempted to access a server-side environment variable on the client",
    );
  },
});
