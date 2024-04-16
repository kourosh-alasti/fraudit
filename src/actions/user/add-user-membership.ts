"use server";

import db from "@/db/drizzle";
import { getFrauditBySlug } from "@/db/queries/fraudit";
import { getUser } from "@/db/queries/user";
import { fraudits, userToFraudits } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  slug: string;
  userId: string;
}

export const addUserMembership = async ({ slug, userId }: Props) => {
  try {
    const user = await getUser(userId);
    const fraudit = await getFrauditBySlug(slug);

    if (!user) {
      throw new Error("User does not exist");
    }

    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    await db.insert(userToFraudits).values({
      frauditId: fraudit.id,
      userId: user.id,
    });

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