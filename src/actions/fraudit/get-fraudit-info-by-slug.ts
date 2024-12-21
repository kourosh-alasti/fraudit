"use server";

import db from "@/db/drizzle";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { fraudits } from "@/db/schema";

interface Props {
  slug: string;
}

export const getFrauditInfoBySlug = async ({ slug }: Props) => {
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
     * Gets the fraudit from the database using the slug
     */
    const data = await db.query.fraudits.findFirst({
      where: eq(fraudits.slug, slug),
    });

    /**
     * Checks if the fraudit exists, if not, throw an error
     */
    if (!data) {
      throw new Error("Fraudit does not exist");
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch fraudit information, please try again.");
  }
};
