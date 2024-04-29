import { professors } from "@/db/schema";
import Link from "next/link";

interface Props {
  professor: typeof professors.$inferSelect;
}

export const ProfessorTabItem = ({ professor }: Props) => {
  return (
    <Link href={`professor/${professor.id}`} className="w-full">
      <div className="flex w-full flex-col gap-1 rounded-md border-2 border-zinc-600 px-2 py-1">
        <h1 className="text-base font-semibold md:text-lg lg:text-xl">
          {`${professor.firstName} ${professor.lastName}`}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-sm md:text-base lg:text-lg">{`${professor.email}`}</p>
          {/* TODO: PROF COUNT */}
          <p className="text-xs md:text-sm lg:text-base">{`${professor.rating?.toFixed(1)} / 5.0`}</p>
        </div>
      </div>
    </Link>
  );
};
