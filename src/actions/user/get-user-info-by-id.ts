"use server";

import { getUser } from "@/db/queries/user";
import { clerkClient } from "@clerk/nextjs";

export const getUserInfoById = async (id: string) => {
  const clerkInfo = await clerkClient.users.getUser(id);
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
