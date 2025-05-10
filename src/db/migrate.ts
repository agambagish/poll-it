import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

config({ path: ".env" });

const pool = new Pool({
  // eslint-disable-next-line node/no-process-env
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool, casing: "snake_case" });

(async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
  }
  catch (error) {
    console.error("❌ Error during migration:", error);
    process.exit(1);
  }
})();
