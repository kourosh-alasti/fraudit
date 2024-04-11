import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Resetting the database");

    await db.delete(schema.courses);
    await db.delete(schema.userToFraudits);
    await db.delete(schema.users);
    await db.delete(schema.fraudits);

    console.log("Database Reset Finished");
  } catch (err) {
    console.error(err);

    throw new Error("Failed to reset Database");
  }
};

main();
