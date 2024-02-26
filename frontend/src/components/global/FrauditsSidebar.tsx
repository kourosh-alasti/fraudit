import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const TEMP_FRAUDITS = [
  "Homework",
  "ComputerScience",
  "CSUFullerton",
  "Classes2Take",
  "Parties&Socials",
  "TopFood",
  "BestBarsInTown",
  "DessertAfter",
  "PsychDepartment",
  "Housing4Cheap",
  "BestMallsInOC",
  "OCDeals",
  "TextBooksMarket",
  "StudyBuddies",
  "Beers&Cheers",
  "SportsTeams",
  "CheapHousing",
  "Flights",
  "CarpooLExclusives",
];

const FrauditsSidebar = () => {
  return (
    <div className="h-[65%] w-[10%] p-2 bg-red-200 rounded-r-xl absolute left-0 md:flex md:flex-col hidden">
      <h2 className=" self-center underline mb-2">Your Subfraudits</h2>
      <ScrollArea className="h-full w-full rounded-md border-none mb-1">
        {TEMP_FRAUDITS.map((temp) => (
          <>
            <p className="text-sm my-2" key={temp}>
              {`f/${temp}`}
            </p>
            {/* <Separator className="my-2" /> */}
          </>
        ))}
      </ScrollArea>
    </div>
  );
};

export default FrauditsSidebar;
