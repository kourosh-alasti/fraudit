"use server";

import { getUserByUsername } from "@/db/queries/user";
import { currentUser } from "@clerk/nextjs";
import { getUserThreadsById } from "./get-user-threads-by-id";

export const getUserThreadsByUsername = async (username: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const otherUser = await getUserByUsername(username);

    if (!otherUser) {
      throw new Error("User not found");
    }

    const allThreads = await getUserThreadsById(otherUser.id);

    if (!allThreads) {
      throw new Error("No Threads Found");
    }

    return allThreads;
  } catch (error) {
    console.error(error);
    throw new Error("An Error has occurred, please try again.");
  }
};
