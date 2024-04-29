"use server";

import db from "@/db/drizzle";
import { getProfessorById } from "@/db/queries/professors/get-professor-by-id";
import { professors, reviews } from "@/db/schema";
import { currentUser } from "@clerk/nextjs";

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
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const prof = await getProfessorById(profId);

    if (!prof) {
      throw new Error("Professor not found");
    }

    const review = await db.insert(reviews).values({
      comment: comment,
      professorId: profId,
      userId: user.id,
      rating: rating,
      courseId: courseId,
      universityId: prof.universityId,
    });

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
