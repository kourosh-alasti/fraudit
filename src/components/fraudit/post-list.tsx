"use client";

import { useEffect, useState } from "react";
import { ThreadItem } from "./thread-item";
// import { threads } from "@/db/schema";

import { getFrauditThreads } from "@/db/queries/thread/get-fraudit-threads";
import { PostListSkeleton } from "../skeletons/post-list-skeletons";

interface Props {
  slug: string;
}

export const PostList = ({ slug }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [threads, setThreads] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const getData = () => {
      getFrauditThreads(slug)
        .then((res) => {
          setThreads(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    };

    getData();
  }, [slug]);

  return (
    <>
      {isLoading && <PostListSkeleton />}
      {!isLoading &&
        threads.length > 0 &&
        threads.map((thread: any) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      {!isLoading && threads.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
            There are no threads. Be the First to Post!
          </h1>
        </div>
      )}
    </>
  );
};
