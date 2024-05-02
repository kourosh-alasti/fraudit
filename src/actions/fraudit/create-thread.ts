"use server";

import db from "@/db/drizzle";
import { getFrauditBySlug } from "@/db/queries/fraudit";
import { threads } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";

interface Props {
  title: string;
  content: string;
  frauditSlug: string;
}

export const createThread = async ({ title, content, frauditSlug }: Props) => {
  /**
   * Grabs the current logged in user from Clerk
   */
  const user = await currentUser();

  /**
   * Grabs the fraudit from the database using the slug
   */
  const fraudit = await getFrauditBySlug(frauditSlug);

  try {
    /**
     * Checks if the user is logged in, if not, throw an error
     */
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    /**
     * Checks if the fraudit exists, if not, throw an error
     */
    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    /**
     * Inserts the new thread into the threads table
     */
    await db.insert(threads).values({
      title: title,
      content: content,
      userId: user.id,
      frauditId: fraudit.id,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Please try again later!");
  }
};
