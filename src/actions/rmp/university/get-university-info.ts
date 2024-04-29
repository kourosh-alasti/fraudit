"use server";

import db from "@/db/drizzle";
import { universities } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export const getUniversityInfo = async (id: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const data = await db.query.universities.findFirst({
      where: eq(universities.id, id),
      with: {
        courses: true,
        professors: true,
        reviews: true,
      },
    });

    if (!data) {
      throw new Error("University not found");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Could not fetch university information, please try again.",
    );
  }
};
