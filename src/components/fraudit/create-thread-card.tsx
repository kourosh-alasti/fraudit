"use client";

import { getFrauditBySlug } from "@/db/queries/fraudit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CreateThreadCardSkeleton } from "./skeletons/create-thread-card-skeleton";
import { addUserMembership } from "@/actions/user/add-user-membership";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

interface Props {
  slug: string;
}

export const CreateThreadCard = ({ slug }: Props) => {
  const [isMember, setIsMember] = useState(false);
  const router = useRouter();

  // const [isLoading, setIsLoading] = useState(true);
  // const [id, setId] = useState<string | null>(null);

  useEffect(() => {}, []);

  const join = () => {
    addUserMembership({ slug: slug })
      .then((res) => {
        setIsMember(true);
        router.refresh();
      })
      .catch((err) => console.error(err || "An Error Occured"));
  };

  return (
    <>
      {/* {isLoading && <CreateThreadCardSkeleton />} */}
      {/* {!isLoading && ( */}
      <div className="flex h-20 w-full items-center justify-center gap-4 rounded-md border shadow-xl ">
        {isMember && (
          <>
            <div className="h-8 w-auto rounded-md border bg-white px-2 py-1 hover:cursor-pointer hover:bg-gray-100">
              <Link href={`/app/create/thread?slug=${slug}`}>Create Post</Link>
            </div>
            <div className="h-8 w-auto rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-rose-700">
              Leave Fraudit
            </div>
          </>
        )}
        {!isMember && (
          <div
            className="mx-10 h-8 w-full rounded-md bg-green-500 px-2 py-1 text-center text-white hover:cursor-pointer hover:bg-green-700"
            onClick={join}
          >
            Join Fraudit
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
};
