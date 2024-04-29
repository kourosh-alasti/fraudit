import { getCourseById } from "@/db/queries/courses/get-course-by-id";
import { courses, reviews } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

interface Props {
  review: typeof reviews.$inferSelect;
}

export const ReviewTabItem = ({ review }: Props) => {
  const [course, setCourse] = useState<typeof courses.$inferSelect>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getCourseById(review.courseId!)
        .then((res) => {
          setCourse(res);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    getData();
  }, []);

  return (
    <>
      {loading && (
        <div>
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      {!loading && course && (
        <div className="flex w-full flex-col gap-1 rounded-md border-2 border-zinc-600 px-2 py-1">
          <h1 className="text-base font-semibold md:text-lg lg:text-xl">
            <StarRatings
              rating={review.rating}
              name="review"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="green"
              starEmptyColor="gray"
              starHoverColor="green"
            />
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base lg:text-lg">{review.comment}</p>
            {/* TODO: PROF COUNT */}
            <p className="text-xs md:text-sm lg:text-base">{`${course.abbreviation} ${course.courseNumber}`}</p>
          </div>
        </div>
      )}
    </>
  );
};
