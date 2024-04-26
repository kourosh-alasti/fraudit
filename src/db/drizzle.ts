import * as dotenv from "dotenv";

dotenv.config({
  path: [".env.local", ".env"],
});

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const sql = neon(process.env.NEXT_PUBLIC_NEON_URL!);
const db = drizzle(sql, { schema });

export default db;
