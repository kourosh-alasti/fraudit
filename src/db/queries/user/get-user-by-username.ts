import { clerkClient } from "@clerk/nextjs";
import { getUser } from "./get-user";

export const getUserByUsername = async (username: string) => {
  const user = await getUserFromClerk(username);

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

const getUserFromClerk = async (username: string) => {
  const allClerkUsers = await clerkClient.users.getUserList({
    username: [username],
  });
  const user = allClerkUsers.find((u) => u.username === username);

  return user;
};
