"use server";

import { getFrauditBySlug } from "@/db/queries/fraudit";
import { currentUser } from "@clerk/nextjs/server";

export const isOwnerOfFraudit = async (slug: string) => {
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
     * Grabs the Fraudit by Slug
     */
    const fraudit = await getFrauditBySlug(slug);

    /**
     * If no fraudit is found, throw an error
     */
    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    /**
     * Check if the current user is the owner of the fraudit
     */
    const isOwner = fraudit.ownerId === user.id;

    return {
      isOwner,
    };
  } catch (err) {
    console.error(err);
    throw new Error("An Error has occurred, please try again.");
  }
};
