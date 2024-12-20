"use server";

import db from "@/db/drizzle";
import { getProfessorById } from "@/db/queries/professors/get-professor-by-id";
import { professors, reviews } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
  profId: string;
  comment: string;
  rating: number;
  courseId: string;
}

export const createReview = async ({
  profId,
  comment,
  rating,
  courseId,
}: Props) => {
  /**
   * Grab the current logged in user
   */
  const user = await currentUser();

  try {
    /**
     * Checks to see if the user is logged in, if not throw error
     */
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    /**
     * Gets Professor by ID
     */
    const prof = await getProfessorById(profId);

    /**
     * Checks to see if the professor exists, if not throw error
     */
    if (!prof) {
      throw new Error("Professor not found");
    }

    /**
     * Creates Reviews
     */
    await db.insert(reviews).values({
      comment: comment,
      professorId: profId,
      userId: user.id,
      rating: rating,
      courseId: courseId,
      universityId: prof.universityId,
    });

    /**
     * Updates Professor Rating
     */
    await db.update(professors).set({
      ratingCount: prof.ratingCount! + 1,
      rating:
        (prof.rating! * prof.ratingCount! + rating) / (prof.ratingCount! + 1),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong, please try again later.");
  }
};
