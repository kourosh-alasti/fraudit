import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("--------------Resetting the database--------------");

    await db.delete(schema.universities);
    console.log("---- DELETED UNIVERSITIES ----");
    await db.delete(schema.courses);
    console.log("---- DELETED COURSES ----");
    await db.delete(schema.professors);
    console.log("---- DELETED PROFESSORS ----");
    await db.delete(schema.professorsToCourses);
    console.log("---- DELETED PROFESSORS_TO_COURSES ----");
    await db.delete(schema.userToFraudits);
    console.log("---- DELETED USER_TO_FRAUDITS ----");
    await db.delete(schema.users);
    console.log("---- DELETED USERS ----");
    await db.delete(schema.fraudits);
    console.log("---- DELETED FRAUDITS ----");
    await db.delete(schema.threads);
    console.log("---- DELETED THREADS ----");
    await db.delete(schema.comments);
    console.log("---- DELETED COMMENTS ----");

    console.log("--------------Database Reset Finished--------------");
  } catch (err) {
    console.error(err);

    throw new Error("Failed to reset Database");
  }
};

main();
