"use server";

import db from "@/db/drizzle";
import { getUser } from "@/db/queries/user";
import { threads } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserThreadsById = async (id: string) => {
  try {
    /**
     * Get User by Id
     */
    const user = await getUser(id);

    /**
     * If the user doesnt exist, throw an error
     */
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    /**
     * Get all Users threads by id
     * order by updated_at desc
     */
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
