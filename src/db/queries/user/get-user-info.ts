import { cache } from "react";
import { getUserByUsername } from "./get-user-by-username";
import { clerkClient } from "@clerk/nextjs";

export const getUserInfo = cache(async (username: string) => {
  const data = await getUserByUsername(username);

  const clerkInfo = await clerkClient.users.getUser(data.id);

  return {
    clerk: clerkInfo,
    db: data,
  };
});
