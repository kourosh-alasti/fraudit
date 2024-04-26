"use server";

import db from "@/db/drizzle";
import { fraudits, userToFraudits } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

interface Props {
  slug: string;
}

export const leaveUserMembership = async ({ slug }: Props) => {
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

    await db
      .delete(userToFraudits)
      .where(
        and(
          eq(userToFraudits.userId, user.id),
          eq(userToFraudits.frauditId, fraudit.id),
        ),
      );

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
