"use client";

import { courses } from "@/db/schema";
import { CourseTabItem } from "./course-tab-item";

interface Props {
  courses: (typeof courses.$inferSelect)[];
}

export const CoursesTab = ({ courses }: Props) => {
  return (
    <>
      {courses.length === 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <h1 className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
            No Courses Found.
          </h1>
        </div>
      )}
      {courses.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          {courses.map((course) => (
            <CourseTabItem key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
};
