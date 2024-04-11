"use server";

import db from "@/db/drizzle";
import { fraudits, userToFraudits } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { addUserMembership } from "../user/add-user-membership";

interface Props {
  title: string;
  description: string;
  slug: string;
}

export const createFraudit = async ({ title, description, slug }: Props) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    await db.insert(fraudits).values({
      title: title,
      descripton: description,
      slug: slug,
      ownerId: user.id,
      memberCount: 0,
    });

    await addUserMembership({
      slug,
      userId: user.id,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Error Creating a New Fraudit");
  }
};
