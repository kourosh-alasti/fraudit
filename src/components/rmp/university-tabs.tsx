import { courses, professors, reviews } from "@/db/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { CoursesTab } from "./courses-tab";
import { ProfessorsTab } from "./professors-tab";
import { ReviewsTab } from "./reviews-tab";

interface Props {
  courses?: (typeof courses.$inferSelect)[];
  professors?: (typeof professors.$inferSelect)[];
  reviews?: (typeof reviews.$inferSelect)[];
}

export const UniversityTabs = ({ courses, professors, reviews }: Props) => {
  return (
    <div className="">
      <Tabs defaultValue="courses" className="mx-auto md:w-[988px]">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-500 text-white">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="professors">Professors</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <CoursesTab courses={courses!} />
        </TabsContent>
        <TabsContent value="professors">
          <ProfessorsTab professors={professors!} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsTab reviews={reviews!} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
