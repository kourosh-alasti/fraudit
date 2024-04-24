import { currentUser } from "@clerk/nextjs";
import { getFrauditBySlug } from "./get-fraudit-by-slug";
import db from "@/db/drizzle";
import { fraudits } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteFrauditBySlug = async (slug: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const fraudit = await getFrauditBySlug(slug);

    if (!fraudit) {
      throw new Error("Fraudit does not exist");
    }

    if (fraudit?.ownerId === user.id) {
      throw new Error("You are not authorized to delete this fraudit");
    }

    await db.delete(fraudits).where(eq(fraudits.slug, slug));

    return {
      message: "Fraudit deleted successfully",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong, please try again later");
  }
};
