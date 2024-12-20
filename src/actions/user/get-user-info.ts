"use server";

import { getUserByUsername } from "@/db/queries/user";
import { clerkClient } from "@clerk/nextjs/server";

export const getUserInfo = async (username: string) => {
  const client = await clerkClient();
  /**
   * Get Database Info By Username
   */
  const data = await getUserByUsername(username);

  /**
   * Get Clerk info by id
   */
  const clerkInfo = await client.users.getUser(data.id);

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
