"use server";

import { getCommentById } from "@/db/queries/comment/get-comment-by-id";
import { currentUser } from "@clerk/nextjs";

export const isOwnerOfComment = async (commentId: string) => {
  const user = await currentUser();

  try {
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    const comment = await getCommentById(commentId);

    if (!comment) {
      throw new Error("Comment does not exist");
    }

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
