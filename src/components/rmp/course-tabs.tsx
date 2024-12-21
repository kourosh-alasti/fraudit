"use client";

import {
  professors as ProfessorsType,
  reviews as ReviewsType,
  professorsToCourses,
  universities,
} from "@/db/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { UniversityInfoTab } from "./university-info-tab";
import { ReviewsTab } from "./reviews-tab";
import { ProfessorsTab } from "./professors-tab";
import { useEffect, useState } from "react";
import { getProfessorById } from "@/db/queries/professors/get-professor-by-id";
import { Loader2 } from "lucide-react";

interface Props {
  university?: typeof universities.$inferSelect;
  professors?: (typeof professorsToCourses.$inferSelect)[];
  reviews?: (typeof ReviewsType.$inferSelect)[];
}

export const CourseTabs = ({ university, professors, reviews }: Props) => {
  const [profs, setProfs] = useState<(typeof ProfessorsType.$inferSelect)[]>(
    [],
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const arr: (typeof ProfessorsType.$inferSelect)[] = [];

    professors?.forEach((prof) => {
      getProfessorById(prof.professorId!)
        .then((res) => {
          arr.push(res);
        })
        .catch((err) => console.error(err));
    });

    setProfs(arr);
    setLoading(false);
  }, [professors]);

  return (
    <>
      {loading && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
      {!loading && (
        <div>
          <Tabs defaultValue="university" className="mx-auto md:w-[988px]">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-500 text-white">
              <TabsTrigger value="university">University</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="professors">Professors</TabsTrigger>
            </TabsList>
            <TabsContent value="university">
              <UniversityInfoTab university={university!} />
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewsTab reviews={reviews!} />
            </TabsContent>
            <TabsContent value="professors">
              <ProfessorsTab professors={profs} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};
