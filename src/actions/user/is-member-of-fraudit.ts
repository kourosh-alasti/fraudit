"use server";

import db from "@/db/drizzle";
import { fraudits, userToFraudits } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export const isMemberOfFraudit = async (slug: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const fraudit = await db.query.fraudits.findFirst({
      where: eq(fraudits.slug, slug),
    });

    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    const data = await db.query.userToFraudits.findFirst({
      where: and(
        eq(userToFraudits.userId, user.id),
        eq(userToFraudits.frauditId, fraudit.id),
      ),
    });

    if (!data) {
      throw new Error("You are not a member of this fraudit");
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch fraudit information, please try again.");
  }
};
