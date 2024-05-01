"use client";

import { CourseTabs } from "@/components/rmp/course-tabs";
import { Separator } from "@/components/ui/separator";
import { getCourseByUniIdAndCourseNumber } from "@/db/queries/courses/get-course-by-uni-id-and-course-number";
import {
  courses,
  professors,
  professorsToCourses,
  reviews,
  universities,
} from "@/db/schema";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const CoursePage = ({
  params: { id, abbr, number },
}: {
  params: { id: string; abbr: string; number: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<typeof courses.$inferSelect>();
  const [university, setUniversity] =
    useState<typeof universities.$inferSelect>();

  const [courseProfessors, setCourseProfessors] =
    useState<(typeof professorsToCourses.$inferSelect)[]>();

  const [courseReviews, setCourseReviews] =
    useState<(typeof reviews.$inferSelect)[]>();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getCourseByUniIdAndCourseNumber({
        uniId: id,
        courseAbbr: abbr,
        courseNumber: number,
      })
        .then((res) => {
          setUniversity(res.university!);
          setCourseReviews(res.reviews!);
          setCourse(res);

          // getProfessor

          setLoading(false);
        })
        .catch((err) => console.error(err));
    };

    getData();
  }, []);

  return (
    <>
      {loading && (
        <div className="mx-auto flex h-full w-full flex-col">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      {!loading && course && (
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold md:text-lg lg:text-2xl">
              {course.title}
            </h1>
            <h3 className="text-base font-bold tracking-wider text-slate-700 md:text-lg lg:text-xl">
              {`${course.abbreviation} ${course.courseNumber}`}
            </h3>
            <div className="flex flex-col md:max-w-[988px] md:flex-row md:items-center md:justify-between">
              <p className="mb-2 mt-6 text-xs text-muted-foreground md:text-sm lg:text-base">
                Course Rating
              </p>
              <StarRatings
                rating={5}
                numberOfStars={5}
                name="course-rating"
                starDimension="25px"
                starEmptyColor="gray"
                starRatedColor="green"
              />
            </div>
          </div>
          <Separator />
          <div className="flex w-full flex-col">
            <CourseTabs
              professors={courseProfessors}
              university={university}
              reviews={courseReviews}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePage;
