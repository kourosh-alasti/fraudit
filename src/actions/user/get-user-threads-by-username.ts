"use server";

import { getUserByUsername } from "@/db/queries/user";
import { currentUser } from "@clerk/nextjs/server";
import { getUserThreadsById } from "./get-user-threads-by-id";

export const getUserThreadsByUsername = async (username: string) => {
  /**
   * Gets the current logged in user
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
     * Get User Info By Username
     */
    const otherUser = await getUserByUsername(username);

    /**
     * If the user info is not found on clerk, throw an error
     */
    if (!otherUser) {
      throw new Error("User not found");
    }

    /**
     * Get User Threads By Id
     */
    const allThreads = await getUserThreadsById(otherUser.id);

    /**
     * If no user threads are found, throw an error
     */
    if (!allThreads) {
      throw new Error("No Threads Found");
    }

    return allThreads;
  } catch (error) {
    console.error(error);
    throw new Error("An Error has occurred, please try again.");
  }
};
