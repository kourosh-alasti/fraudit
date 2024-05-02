"use server";

import { getThreadById } from "@/db/queries/thread";
import { currentUser } from "@clerk/nextjs";

export const isOwnerOfThread = async (threadId: string) => {
  /**
   * Grabs the current logged in user
   */
  const user = await currentUser();

  try {
    /**
     * If the user is not logged in, throw an error
     */
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    /**
     * Get the thread by ID
     */
    const thread = await getThreadById(threadId);

    /**
     * If no thread is found, throw an error
     */
    if (!thread) {
      throw new Error("Thread does not exist");
    }

    /**
     * Check if the current user is the owner of the thread
     */
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
