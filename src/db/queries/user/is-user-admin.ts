import { cache } from "react";
import { getUser } from "./get-user";

export const isUserAdmin = cache(async (userId: string) => {
  const data = await getUser(userId);

  if (!data) {
    throw new Error("Inalid User Id");
  }

  if (data.isAdmin) {
    return { isAdmin: true };
  }

  return {
    isAdmin: false,
  };
});
