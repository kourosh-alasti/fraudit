"use server";

import { getProfessorsByQuery } from "@/db/queries/professors/get-professors-by-query";
import { currentUser } from "@clerk/nextjs/server";

export const searchProfessor = async (query: string) => {
  /**
   * Grabs the current logged in user
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
     * Grabs the professors by the query
     */
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
