import { clerkClient } from "@clerk/nextjs";
import { getUser } from "./get-user";

export const getUserByUsername = async (username: string) => {
  const allClerkUsers = await clerkClient.users.getUserList();
  const user = allClerkUsers.find((u) => u.username === username);

  if (!user) {
    throw new Error("No User Found with this Username");
  }

  const userId = user.id;

  const data = await getUser(userId);

  if (!data) {
    throw new Error("No User Found with this Username");
  }

  return data;
};
