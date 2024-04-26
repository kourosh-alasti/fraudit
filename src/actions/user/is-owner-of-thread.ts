"use server";

import { getThreadById } from "@/db/queries/thread";
import { currentUser } from "@clerk/nextjs";

export const isOwnerOfThread = async (threadId: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const thread = await getThreadById(threadId);

    if (!thread) {
      throw new Error("Thread does not exist");
    }

    const isOwner = thread.userId === user.id;

    return {
      isOwner: isOwner,
      thread: thread,
      user: user,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later!");
  }
};
