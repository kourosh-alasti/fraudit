"use server";

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
  content: string;
  frauditId: string;
  threadId: string;
}

export const createComment = async ({
  content,
  frauditId,
  threadId,
}: Props) => {
  /**
   * Pulls the current logged in user from Clerk
   */
  const user = await currentUser();

  try {
    /**
     * Checks if the user is logged in, if not, throw an error
     */
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    /**
     * Inserts the new comment into the comments table
     */
    await db.insert(comments).values({
      content: content,
      frauditId: frauditId,
      threadId: threadId,
      userId: user.id,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong, please try again later.");
  }
};
