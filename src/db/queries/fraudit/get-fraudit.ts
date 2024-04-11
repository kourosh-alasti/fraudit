import db from "@/db/drizzle";
import { comments, fraudits, threads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getFraudit = cache(async (frauditId: string) => {
  const data = await db.query.fraudits.findFirst({
    where: eq(fraudits.id, frauditId),
    with: {
      threads: {
        orderBy: (threads, { desc }) => [desc(threads.updatedAt)],
        with: {
          comments: {
            orderBy: (comments, { desc }) => [desc(comments.updatedAt)],
          },
        },
      },
    },
  });

  return data;
});
