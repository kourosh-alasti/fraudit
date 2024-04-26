"use server";

import { getUserByUsername } from "@/db/queries/user";
import { clerkClient } from "@clerk/nextjs";

export const getUserInfo = async (username: string) => {
  const data = await getUserByUsername(username);

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
