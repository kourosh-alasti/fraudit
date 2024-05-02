"use server";

import db from "@/db/drizzle";
import { fraudits, userToFraudits } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

interface Props {
  slug: string;
}

export const leaveUserMembership = async ({ slug }: Props) => {
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
     * Get Fraudit by Slug
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
     * Delete the relationship between the user and the fraudit
     */
    await db
      .delete(userToFraudits)
      .where(
        and(
          eq(userToFraudits.userId, user.id),
          eq(userToFraudits.frauditId, fraudit.id),
        ),
      );

    /**
     * Decrement the member count of the fraudit
     */
    await db
      .update(fraudits)
      .set({
        memberCount: fraudit.memberCount! - 1,
      })
      .where(eq(fraudits.id, fraudit.id));
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Please try again later!");
  }
};
