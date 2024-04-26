"use server";

import db from "@/db/drizzle";
import { getUser } from "@/db/queries/user";
import { threads } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getUserThreads = async (id?: string) => {
  let user: any;

  if (!id) {
    user = await currentUser();
  } else {
    user = await getUser(id);
  }

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const allUserThreads = await db.query.threads.findMany({
      where: eq(threads.userId, user.id),
      orderBy: (threads, { desc }) => [desc(threads.updatedAt)],
    });

    if (!allUserThreads || allUserThreads.length === 0) {
      throw new Error("No Threads Found");
    }

    return allUserThreads;
  } catch (error) {
    console.error(error);
    throw new Error("An Error has occurred, please try again.");
  }
};
