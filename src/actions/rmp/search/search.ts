"use server";

import { getProfessorsByQuery } from "@/db/queries/professors/get-professors-by-query";
import { currentUser } from "@clerk/nextjs";

export const searchProfessor = async (query: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const professors = await getProfessorsByQuery(query);

    return {
      professors: professors,
      length: professors.length,
    };
  } catch (error) {
    console.error(error);
    throw new Error("An Error has occurred, please try again.");
  }
};
