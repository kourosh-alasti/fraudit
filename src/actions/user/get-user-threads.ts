"use server";

import db from "@/db/drizzle";
import { getUser } from "@/db/queries/user";
import { threads } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getUserThreads = async () => {
  /**
   * Grabs the current logged in user
   */
  const user = await currentUser();

  try {
    /**
     * If the user is not logged in, throw an error
     */
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    /**
     * get all user threads
     * order by updated_at desc
     */
    const allUserThreads = await db.query.threads.findMany({
      where: eq(threads.userId, user.id),
      orderBy: (threads, { desc }) => [desc(threads.updatedAt)],
    });

    /**
     * If no user threads are found, throw an error
     */
    if (!allUserThreads || allUserThreads.length === 0) {
      throw new Error("No Threads Found");
    }

    return allUserThreads;
  } catch (error) {
    console.error(error);
    throw new Error("An Error has occurred, please try again.");
  }
};
