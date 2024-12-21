"use client";

import {
  professorsToCourses,
  reviews,
  universities,
  courses as CoursesType,
} from "@/db/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ReviewsTab } from "./reviews-tab";
import { useEffect, useState } from "react";
import { UniversityInfoTab } from "./university-info-tab";
import { getCourseById } from "@/db/queries/courses/get-course-by-id";
import { CoursesTab } from "./courses-tab";
import { Loader2 } from "lucide-react";

interface Props {
  university?: typeof universities.$inferSelect;
  reviews?: (typeof reviews.$inferSelect)[];
  courses?: (typeof professorsToCourses.$inferSelect)[];
}

export const ProfessorTabs = ({ university, reviews, courses }: Props) => {
  const [loading, setLoading] = useState(false);
  const [profCourses, setProfCourses] = useState<
    (typeof CoursesType.$inferSelect)[]
  >([]);

  useEffect(() => {
    setLoading(true);

    const arr: (typeof CoursesType.$inferSelect)[] = [];

    courses?.forEach((course) => {
      getCourseById(course.courseId!)
        .then((res) => {
          arr.push(res);
        })
        .catch((err) => console.error(err));
    });

    setProfCourses(arr);

    setLoading(false);
  }, [courses]);

  return (
    <>
      {loading && (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      {!loading && (
        <div className="">
          <Tabs defaultValue="university" className="mx-auto md:w-[988px]">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-500 text-white">
              <TabsTrigger value="university">University</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>
            <TabsContent value="university">
              <UniversityInfoTab university={university} />
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewsTab reviews={reviews!} />
            </TabsContent>
            <TabsContent value="courses">
              <CoursesTab courses={profCourses} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};
