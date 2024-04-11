import db from "@/db/drizzle";
import { fraudits, userToFraudits, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getUser = cache(async (userId: string) => {
  const data = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      ownerOf: {
        orderBy: (fraudits, { asc }) => [asc(fraudits.slug)],
      },
      userToFraudits: {
        orderBy: (userToFraudits, { asc }) => [asc(userToFraudits.frauditId)],
      },
    },
  });

  return data;
});
