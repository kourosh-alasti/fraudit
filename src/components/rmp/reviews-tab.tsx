"use client";

import { reviews } from "@/db/schema";
import { Card } from "../ui/card";
import { ReviewTabItem } from "./review-tab-item";

interface Props {
  reviews: (typeof reviews.$inferSelect)[];
}

export const ReviewsTab = ({ reviews }: Props) => {
  return (
    <>
      {reviews.length === 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <h1 className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
            No Reviews Found.
          </h1>
        </div>
      )}
      {reviews.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2">
          {reviews.map((review) => (
            <ReviewTabItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </>
  );
};
