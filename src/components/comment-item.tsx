"use client";

import { getUserInfoById } from "@/actions/user";
import { comments } from "@/db/schema";
import { useEffect, useState } from "react";
import { CommentItemSkeleton } from "./skeletons/comment-item-skeleton";
import Link from "next/link";

interface Props {
  comment: typeof comments.$inferSelect;
}

export const CommentItem = ({ comment }: Props) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getUserInfoById(comment.userId!)
        .then((res) => {
          setUser(res);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    };

    getData();
  }, [comment.userId]);

  return (
    <>
      {loading && <CommentItemSkeleton />}
      {!loading && (
        <div className="flex w-full justify-between rounded-md bg-white px-2 py-1">
          <p>{comment.content}</p>
          <div className="flex flex-col gap-2">
            <Link href={`/app/u/${user.clerk?.username}`} className="self-end">
              <p>{`u/${user.clerk?.username}`}</p>
            </Link>
            <p>{comment.createdAt!.toLocaleString()}</p>
          </div>
        </div>
      )}
    </>
  );
};
