"use server";

import db from "@/db/drizzle";
import { getFrauditBySlug } from "@/db/queries/fraudit";
import { currentUser } from "@clerk/nextjs";

export const isOwnerOfFraudit = async (slug: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const fraudit = await getFrauditBySlug(slug);

    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    const isOwner = fraudit.ownerId === user.id;

    return {
      isOwner,
      // fraudit,
      // user,
    };
  } catch (err) {
    console.error(err);
    throw new Error("An Error has occurred, please try again.");
  }
};
