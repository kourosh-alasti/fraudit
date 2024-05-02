"use server";

import db from "@/db/drizzle";
import { fraudits } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { addUserMembership } from "../user/add-user-membership";
import { NeonDbError } from "@neondatabase/serverless";

interface Props {
  title: string;
  description: string;
  slug: string;
}

export const createFraudit = async ({ title, description, slug }: Props) => {
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
     * Inserts the new fraudit into the fraudits table
     */
    await db.insert(fraudits).values({
      title: title,
      descripton: description,
      slug: slug,
      ownerId: user.id,
      memberCount: 0,
    });

    /**
     * Adds the owner to the fraudit
     */
    await addUserMembership({
      slug,
      userId: user.id,
    });
  } catch (err) {
    if (err instanceof NeonDbError) {
      console.error(err.message);

      if (err.message.includes("fraudits_slug_unique")) {
        throw new Error("Fraudit with that slug exists");
      }

      if (err.message.includes("fraudits_title_unique")) {
        throw new Error("Frauit with that title exists");
      }
    }
    console.error(err);
    throw new Error("Something went wrong, please try again later");
  }
};
