"use server";

import db from "@/db/drizzle";
import { fraudits, userToFraudits } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { Alegreya_SC } from "next/font/google";

export const isMemberOfFraudit = async (slug: string) => {
  /**
   * Get the current logged in user
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
     * Get Fraudit By Slug
     */
    const fraudit = await db.query.fraudits.findFirst({
      where: eq(fraudits.slug, slug),
    });

    /**
     * If no fraudit is found, throw an error
     */
    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    /**
     * Check if the current user is a member of the fraudit
     */
    const data = await db.query.userToFraudits.findFirst({
      where: and(
        eq(userToFraudits.userId, user.id),
        eq(userToFraudits.frauditId, fraudit.id),
      ),
    });

    /**
     * If the user is not a member of the fraudit, return false
     */
    if (!data) {
      return {
        isMember: false,
      };
    }

    return {
      isMember: true,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch fraudit information, please try again.");
  }
};
