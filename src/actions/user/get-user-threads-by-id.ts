"use server";

import db from "@/db/drizzle";
import { getUser } from "@/db/queries/user";
import { threads } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserThreadsById = async (id: string) => {
  try {
    const user = await getUser(id);

    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const allUserThreads = await db.query.threads.findMany({
      where: eq(threads.userId, user.id),
      orderBy: (threads, { desc }) => [desc(threads.updatedAt)],
    });

    return allUserThreads || [];
  } catch (error) {
    console.error(error);
    throw new Error("An Error has occurred, please try again.");
  }
};
