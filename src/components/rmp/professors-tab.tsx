"use client";

import { professors } from "@/db/schema";
import { ProfessorTabItem } from "./professor-tab-item";

interface Props {
  professors: (typeof professors.$inferSelect)[];
}

export const ProfessorsTab = ({ professors }: Props) => {
  return (
    <>
      {professors.length === 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <h1 className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
            No Professors Found.
          </h1>
        </div>
      )}
      {professors.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          {professors.map((professor) => (
            <ProfessorTabItem key={professor.id} professor={professor} />
          ))}
        </div>
      )}
    </>
  );
};
