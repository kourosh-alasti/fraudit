"use server";

import db from "@/db/drizzle";
import { universities } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getUniversityInfo = async (id: string) => {
  /**
   * Gets the current logged in user
   */
  const user = await currentUser();

  try {
    /**
     * If the user is not logged in, throw an error
     */
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    /**
     * get the university information by the id
     * return university relationships with courses, professors, and reviews
     */
    const data = await db.query.universities.findFirst({
      where: eq(universities.id, id),
      with: {
        courses: true,
        professors: true,
        reviews: true,
      },
    });

    /**
     * If the university is not found, throw an error
     */
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
