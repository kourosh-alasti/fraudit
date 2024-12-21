import { Suspense } from "react";
import ProfessorReviewComponent from "./_component";

const ReviewPage = () => {
  return (
    <Suspense>
      <ProfessorReviewComponent />
    </Suspense>
  );
};

export default ReviewPage;
