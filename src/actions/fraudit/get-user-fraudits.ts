"use server";

import db from "@/db/drizzle";
import { fraudits, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { getFraudit } from "../../db/queries/fraudit";

export const getUserFraudits = async () => {
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
     * Finds the user from the database using the user id
     * Returns User and Relationship with Fraudits
     */
    const data = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      with: {
        userToFraudits: true,
      },
    });

    /**
     * Checks if the user exists, if not, throw an error
     */
    if (!data) {
      throw new Error("User does not exist");
    }

    /**
     * Checks if the user has any fraudits, if not, return an empty array
     */
    if (data.userToFraudits.length === 0) {
      return [];
    }

    /**
     * Gets all Fraudit Ids from the user to fraudits relationship
     */
    const frauditIds = data.userToFraudits.map((i) => i.frauditId);

    const userFraudits: (typeof fraudits.$inferSelect)[] = [];

    /**
     * Gets all fraudits from the database using the fraudit ids
     */
    for (let i = 0; i < frauditIds.length; i++) {
      const data = await getFraudit(frauditIds[i]);

      userFraudits.push(data!);
    }

    return userFraudits;
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch user fraudits, please try again later.");
  }
};
