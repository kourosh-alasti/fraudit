import { courses } from "@/db/schema";
import Link from "next/link";

interface Props {
  course: typeof courses.$inferSelect;
}

export const CourseTabItem = ({ course }: Props) => {
  return (
    <Link
      href={`course/${course.abbreviation}/${course.courseNumber}`}
      className="w-full"
    >
      <div className="flex flex-col gap-1 rounded-md border-2 border-zinc-600 px-2 py-1">
        <h1 className="text-base font-semibold md:text-lg lg:text-xl">
          {course.title}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-sm md:text-base lg:text-lg">{`${course.abbreviation} ${course.courseNumber}`}</p>
          {/* TODO: PROF COUNT */}
          <p className="text-xs md:text-sm lg:text-base">{`1 Prof.`}</p>
        </div>
      </div>
    </Link>
  );
};
