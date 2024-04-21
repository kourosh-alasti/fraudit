"use server";

import db from "@/db/drizzle";
import { getFrauditBySlug } from "@/db/queries/fraudit";
import { threads } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";

interface Props {
  title: string;
  content: string;
  frauditSlug: string;
}

export const createThread = async ({ title, content, frauditSlug }: Props) => {
  const user = await currentUser();

  const fraudit = await getFrauditBySlug(frauditSlug);

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    await db.insert(threads).values({
      title: title,
      content: content,
      userId: user.id,
      frauditId: fraudit.id,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong. Please try again later!");
  }
};
