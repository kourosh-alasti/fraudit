"use server";

import { getUser } from "@/db/queries/user";
import { clerkClient } from "@clerk/nextjs";

export const getUserInfoById = async (id: string) => {
  /**
   * Get Clerk info By Id
   */
  const clerkInfo = await clerkClient.users.getUser(id);

  /**
   * Get Database Info By Id
   */
  const data = await getUser(id);

  return {
    clerk: {
      id: clerkInfo.id,
      imageUrl: clerkInfo.imageUrl,
      username: clerkInfo.username,
      createdAt: clerkInfo.createdAt,
      firstName: clerkInfo.firstName,
      lastName: clerkInfo.lastName,
    },
    database: {
      ...data,
    },
  };
};
