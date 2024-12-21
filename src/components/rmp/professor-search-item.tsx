"use client";

import { getUniversityById } from "@/db/queries/university/get-university-by-id";
import { professors, universities } from "@/db/schema";
import Link from "next/link";
import { useEffect, useState } from "react";

type TESTPROFS = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
  universityId: string;
};

interface Props {
  professor: typeof professors.$inferSelect | TESTPROFS;
}

export const ProfessorSearchItem = ({ professor }: Props) => {
  const [loading, setLoading] = useState(true);
  const [uni, setUni] = useState<typeof universities.$inferSelect>();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getUniversityById(professor.universityId!)
        .then((res) => {
          setUni(res);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    };

    getData();
  }, [professor.universityId]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <Link
          key={professor.id}
          href={`/rmp/university/professor/${professor.id}`}
        >
          <div className="flex w-full justify-between rounded border border-black bg-zinc-50 px-2 py-1 shadow-md hover:shadow-xl">
            <div className="flex flex-col gap-1">
              <p className="text-base md:text-lg">{`${professor.firstName} ${professor.lastName} - CSUF`}</p>
              <p className="text-sm md:text-base">{professor.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs md:text-sm">Rating</p>
              <p>{`${professor.rating?.toFixed(1)} / 5.0`}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
