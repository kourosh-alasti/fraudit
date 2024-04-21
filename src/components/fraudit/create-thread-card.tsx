"use client";

import { getFrauditBySlug } from "@/db/queries/fraudit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CreateThreadCardSkeleton } from "./skeletons/create-thread-card-skeleton";

interface Props {
  slug: string;
}

export const CreateThreadCard = ({ slug }: Props) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [id, setId] = useState<string | null>(null);

  // useEffect(() => {
  //   setIsLoading(true);

  //   const getData = () => {
  //     getFrauditBySlug(slug).then((data) => setId(data!.id));

  //     setIsLoading(false);
  //   };

  //   getData();
  // }, [slug]);

  return (
    <>
      {/* {isLoading && <CreateThreadCardSkeleton />} */}
      {/* {!isLoading && ( */}
      <div className="flex h-20 w-full items-center justify-center gap-4 rounded-md border shadow-xl ">
        <div className="h-8 w-auto rounded-md border bg-white px-2 py-1 hover:cursor-pointer hover:bg-gray-100">
          <Link href={`/app/create/thread?slug=${slug}`}>Create Post</Link>
        </div>
        <div className="h-8 w-auto rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-rose-700">
          Leave Fraudit
        </div>
      </div>
      {/* )} */}
    </>
  );
};
