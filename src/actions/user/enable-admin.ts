import db from "@/db/drizzle";
import { isUserAdmin } from "@/db/queries/user";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const enableAdmin = async (userToElevate: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("You Must Be Logged In");
  }

  const { isAdmin } = await isUserAdmin(userId);

  if (!isAdmin) {
    throw new Error("Unauthorized Access");
  }

  await db
    .update(users)
    .set({
      isAdmin: true,
    })
    .where(eq(users.id, userToElevate));

  revalidatePath("/");
};
