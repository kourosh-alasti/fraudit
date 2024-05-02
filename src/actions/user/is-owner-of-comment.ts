"use server";

import { getCommentById } from "@/db/queries/comment/get-comment-by-id";
import { currentUser } from "@clerk/nextjs";

export const isOwnerOfComment = async (commentId: string) => {
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
     * Get Comment By Id
     */
    const comment = await getCommentById(commentId);

    /**
     * If no comment is found, throw an error
     */
    if (!comment) {
      throw new Error("Comment does not exist");
    }

    /**
     * Check if the current user is the owner of the comment
     */
    const isOwner = comment.userId === user.id;

    return {
      isOwner,
      comment,
      user,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
};
