"use client";
import { getUniversityInfo } from "@/actions/rmp/university/get-university-info";
import { Separator } from "@/components/ui/separator";
import { UniversityTabs } from "@/components/rmp/university-tabs";
import { universities, professors, courses, reviews } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import StarRatings from "react-star-ratings";

const UniversityPage = ({ params: { id } }: { params: { id: string } }) => {
  const universityId = id;

  const [loading, setLoading] = useState(true);
  const [uni, setUni] = useState<typeof universities.$inferSelect>();

  const [uniCourses, setUniCourses] =
    useState<(typeof courses.$inferSelect)[]>();
  const [uniProfessors, setUniProfessors] =
    useState<(typeof professors.$inferSelect)[]>();
  const [uniReviews, setUniReviews] =
    useState<(typeof reviews.$inferSelect)[]>();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getUniversityInfo(universityId)
        .then((res) => {
          setUniCourses(res.courses);
          setUniProfessors(res.professors);
          setUniReviews(res.reviews);
          setUni(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getData();
  }, []);

  // TODO: SKELETON
  return (
    <>
      {loading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}

      {!loading && uni && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
              {uni.name}
            </h1>
            <h3 className="text-base font-bold tracking-wider text-slate-700 md:text-lg lg:text-xl">
              {uni.abbreviation}
            </h3>
            <div className="flex flex-col md:max-w-[988px] md:flex-row md:items-center md:justify-between">
              <p className=" mb-2 mt-6 text-xs text-muted-foreground md:text-sm lg:text-base">
                University Rating
              </p>
              <StarRatings
                name="university-rating"
                rating={uni.rating!}
                starEmptyColor="gray"
                starRatedColor="green"
                starDimension="25px"
              />
            </div>
          </div>
          <Separator />
          <div className="flex w-full flex-col">
            <UniversityTabs
              courses={uniCourses}
              professors={uniProfessors}
              reviews={uniReviews}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UniversityPage;
