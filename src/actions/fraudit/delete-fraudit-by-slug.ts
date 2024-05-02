"use server";

import { currentUser } from "@clerk/nextjs";
import { getFrauditBySlug } from "@/db/queries/fraudit";
import db from "@/db/drizzle";
import { fraudits } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteFrauditBySlug = async (slug: string) => {
  /**
   * Grabs the current logged in user from Clerk
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
     * Grabs the fraudit from the database using the slug
     */
    const fraudit = await getFrauditBySlug(slug);

    /**
     * Checks if the fraudit exists, if not, throw an error
     */
    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    /**
     * Checks if the user is the owner of the fraudit, if not, throw an error
     */
    if (fraudit?.ownerId !== user.id) {
      throw new Error("You are not authorized to delete this fraudit");
    }

    /**
     * Deletes the fraudit from the database
     */
    await db.delete(fraudits).where(eq(fraudits.slug, slug));
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong, please try again later");
  }
};
