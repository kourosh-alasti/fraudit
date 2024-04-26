"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CreateThreadCardSkeleton } from "../skeletons/create-thread-card-skeleton";
import { addUserMembership } from "@/actions/user/add-user-membership";
import { useRouter } from "next/navigation";
import { isMemberOfFraudit } from "@/actions/user/is-member-of-fraudit";
import { leaveUserMembership } from "@/actions/user/leave-user-membership";
import { isOwnerOfFraudit } from "@/actions/user/is-owner-of-fraudit";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { DestructiveModal } from "../destructive-modal";
import { cn } from "@/lib/utils";

interface Props {
  slug: string;
  className?: string;
}

export const CreateThreadCard = ({ slug, className }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);

      isMemberOfFraudit(slug)
        .then((res) => {
          if (res) {
            setIsMember(res.isMember);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsMember(false);
        });

      isOwnerOfFraudit(slug)
        .then((res) => {
          if (res) {
            setIsOwner(res.isOwner);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
    router.refresh();
  }, []);

  const join = () => {
    addUserMembership({ slug: slug })
      .then((res) => {
        setIsMember(true);
        location.reload();
      })
      .catch((err) => console.error(err || "An Error Occured"));
  };

  return (
    <>
      {isLoading && <CreateThreadCardSkeleton className={className} />}
      {!isLoading && isMember && (
        <div
          className={cn(
            "flex h-20 w-full items-center justify-center gap-4 rounded-md border shadow-xl",
            className,
          )}
        >
          {isMember && (
            <>
              <Button
                variant="ghost"
                className="h-8 w-auto rounded-md border bg-white px-2 py-1 hover:cursor-pointer hover:bg-gray-100"
              >
                <Link href={`/app/create/thread?slug=${slug}`}>
                  Create Post
                </Link>
              </Button>
              {isMember && !isOwner && (
                <DestructiveModal mode="leave" slug={slug}>
                  <Button className="h-8 w-auto rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-rose-700">
                    Leave Fraudit
                  </Button>
                </DestructiveModal>
              )}

              {isMember && isOwner && (
                <DestructiveModal mode="delete" slug={slug}>
                  <Button
                    className="h-8 w-auto rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-not-allowed  hover:bg-rose-700"
                    disabled
                  >
                    Delete Fraudit
                  </Button>
                </DestructiveModal>
              )}
            </>
          )}
        </div>
      )}
      {!isLoading && !isMember && (
        <div className="flex h-20 w-full items-center justify-center gap-4 rounded-md border shadow-xl ">
          {!isMember && (
            <Button
              className="mx-10 h-8 w-full rounded-md bg-green-500 px-2 py-1 text-center text-white hover:cursor-pointer hover:bg-green-700"
              onClick={join}
            >
              Join Fraudit
            </Button>
          )}
        </div>
      )}
    </>
  );
};
