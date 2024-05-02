"use server";

import { getUserByUsername } from "@/db/queries/user";
import { clerkClient } from "@clerk/nextjs";

export const getUserInfo = async (username: string) => {
  /**
   * Get Database Info By Username
   */
  const data = await getUserByUsername(username);

  /**
   * Get Clerk info by id
   */
  const clerkInfo = await clerkClient.users.getUser(data.id);

  return {
    clerk: {
      id: clerkInfo.id,
      imageUrl: clerkInfo.imageUrl,
      username: clerkInfo.username,
      firstName: clerkInfo.firstName,
      lastName: clerkInfo.lastName,
      createdAt: clerkInfo.createdAt,
    },
    database: {
      ...data,
    },
  };
};
