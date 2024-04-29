import { universities } from "@/db/schema";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import { Button } from "../ui/button";

interface Props {
  university?: typeof universities.$inferSelect;
}

export const UniversityInfoTab = ({ university }: Props) => {
  return (
    <>
      {!university && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <h1 className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
            No Reviews Found.
          </h1>
        </div>
      )}
      {university && (
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
            {university.name}
          </h1>
          <h3 className="text-base font-bold tracking-wider text-slate-700 md:text-lg lg:text-xl">
            {university.abbreviation}
          </h3>
          <div className="flex flex-col md:max-w-[988px] md:flex-row md:items-center md:justify-between">
            <p className=" mb-2 mt-6 text-xs text-muted-foreground md:text-sm lg:text-base">
              University Rating
            </p>
            <StarRatings
              name="universityversity-rating"
              rating={university.rating!}
              starEmptyColor="gray"
              starRatedColor="green"
              starDimension="25px"
            />
          </div>

          <Link
            href={`/rmp/university/${university.id}`}
            className="mx-auto mt-8 hover:cursor-pointer"
          >
            <Button>View University</Button>
          </Link>
        </div>
      )}
    </>
  );
};
