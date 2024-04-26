"use server";

import db from "@/db/drizzle";
import { comments } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { NeonDbError } from "@neondatabase/serverless";

interface Props {
  content: string;
  frauditId: string;
  threadId: string;
}

export const createComment = async ({
  content,
  frauditId,
  threadId,
}: Props) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    await db.insert(comments).values({
      content: content,
      frauditId: frauditId,
      threadId: threadId,
      userId: user.id,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong, please try again later.");
  }
};
