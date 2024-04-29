"use client";

import { ProfessorTabs } from "@/components/rmp/professor-tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProfessorById } from "@/db/queries/professors/get-professor-by-id";
import {
  professors,
  professorsToCourses,
  reviews,
  universities,
} from "@/db/schema";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const ProfessorPage = ({ params: { id } }: { params: { id: string } }) => {
  const professorId = id;

  const [loading, setLoading] = useState(true);
  const [prof, setProf] = useState<typeof professors.$inferSelect>();
  const [uni, setUni] = useState<typeof universities.$inferSelect>();
  const [profReviews, setProfReviews] =
    useState<(typeof reviews.$inferSelect)[]>();
  const [profRelations, setProfRelations] =
    useState<(typeof professorsToCourses.$inferSelect)[]>();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getProfessorById(professorId)
        .then((res) => {
          setUni(res.university!);
          setProfReviews(res.reviews!);
          setProfRelations(res.professorsToCourses!);
          setProf(res);
          setLoading(false);
        })
        .catch((error) => console.error(error));
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

      {!loading && prof && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
                {`${prof.firstName} ${prof.lastName}`}
              </h1>
              <h3 className="text-base font-bold tracking-wide text-slate-700 md:text-lg lg:text-xl">
                {prof.email}
              </h3>
            </div>
            <Link href={`/rmp/university/professor/review?id=${professorId}`}>
              <Button variant={"secondary"}>Review Me</Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col md:max-w-[988px] md:flex-row md:items-center md:justify-between">
              <p className=" mb-2 mt-6 text-xs text-muted-foreground md:text-sm lg:text-base">
                Professor Rating
              </p>
              <StarRatings
                name="professor-rating"
                rating={prof.rating!}
                starEmptyColor="gray"
                starRatedColor="blue"
                starDimension="20px"
                starSpacing="2px"
              />
            </div>
          </div>
          <Separator />
          <div className="flex w-full flex-col">
            <ProfessorTabs
              university={uni}
              reviews={profReviews}
              courses={profRelations}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessorPage;
