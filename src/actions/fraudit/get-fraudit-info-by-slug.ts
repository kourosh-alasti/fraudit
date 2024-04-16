"use server";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { getFrauditBySlug } from "@/db/queries/fraudit";
import { eq } from "drizzle-orm";
import { fraudits } from "@/db/schema";

interface Props {
  slug: string;
}

export const getFrauditInfoBySlug = async ({ slug }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized Access");
  }

  try {
    const data = await db.query.fraudits.findFirst({
      where: eq(fraudits.slug, slug),
    });

    if (!data) {
      throw new Error("Fraudit does not exist");
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch fraudit informatin, please try again.");
  }
};
