"use server";

import db from "@/db/drizzle";
import { getFrauditBySlug } from "@/db/queries/fraudit";
import { getUser } from "@/db/queries/user";
import { fraudits, userToFraudits } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

interface Props {
  slug: string;
  userId?: string;
}

export const addUserMembership = async ({ slug, userId }: Props) => {
  try {
    let user;
    /**
     * Check if other user joined or if self join
     */
    if (userId) {
      /**
       * If Other User
       * Get Use info
       */
      user = await getUser(userId);
    } else {
      /**
       * If Self
       * Get curent user info
       */
      const { userId: id } = await auth();
      user = await getUser(id!);
    }

    /**
     * Get Fraudit by slug
     */
    const fraudit = await getFrauditBySlug(slug);

    /**
     * If No User Exist, throw error
     */
    if (!user) {
      throw new Error("User does not exist");
    }

    /**
     * If No Fraudit Exist, throw error
     */
    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    /**
     * Create membership relationship
     */
    await db.insert(userToFraudits).values({
      frauditId: fraudit.id,
      userId: user.id,
    });

    /**
     * Update fraudit member count
     */
    await db
      .update(fraudits)
      .set({
        memberCount: fraudit.memberCount! + 1,
      })
      .where(eq(fraudits.id, fraudit.id));
  } catch (error) {
    console.log(error);
    throw new Error("Error creating membership relationship");
  }
};
