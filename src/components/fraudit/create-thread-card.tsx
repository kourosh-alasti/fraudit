"use client";

import Link from "next/link";
import { deleteFrauditBySlug } from "@/db/queries/fraudit";
import { useEffect, useState } from "react";
import { CreateThreadCardSkeleton } from "./skeletons/create-thread-card-skeleton";
import { addUserMembership } from "@/actions/user/add-user-membership";
import { useRouter } from "next/navigation";
import { isMemberOfFraudit } from "@/actions/user/is-member-of-fraudit";
import { leaveUserMembership } from "@/actions/user/leave-user-membership";
import { isOwnerOfFraudit } from "@/actions/user/is-owner-of-fraudit";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface Props {
  slug: string;
}

export const CreateThreadCard = ({ slug }: Props) => {
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
        });

      isOwnerOfFraudit(slug)
        .then((res) => {
          if (res) {
            setIsOwner(res.isOwner);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
    setIsLoading(false);
  }, []);

  const join = () => {
    addUserMembership({ slug: slug })
      .then((res) => {
        setIsMember(true);
        router.refresh();
      })
      .catch((err) => console.error(err || "An Error Occured"));
  };

  const leaveFraudit = () => {
    leaveUserMembership({ slug })
      .then(() => {
        toast({
          title: "Success",
          description: "Successfully left the fraudit",
          variant: "success",
        });

        setIsMember(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "An Error Occured",
          description: err.message || "Failed to leave the fraudit",
        });

        console.error(err || "An Error Occured");
      });
  };

  const deleteFraudit = () => {
    deleteFrauditBySlug(slug)
      .then((res) => {
        toast({
          variant: "success",
          title: "Fraudit Deleted",
          description: "Fraudit has been deleted",
        });

        router.push("/app");
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "An Error Occured",
          description:
            err?.message || "Failed to delete Fraudit, please try again later",
        });

        console.error(err || "An Error Occured");
      });
  };

  return (
    <>
      {isLoading && <CreateThreadCardSkeleton />}
      {!isLoading && isMember && (
        <div className="flex h-20 w-full items-center justify-center gap-4 rounded-md border shadow-xl ">
          {isMember && (
            <>
              <Button className="h-8 w-auto rounded-md border bg-white px-2 py-1 hover:cursor-pointer hover:bg-gray-100">
                <Link href={`/app/create/thread?slug=${slug}`}>
                  Create Post
                </Link>
              </Button>
              {isMember && !isOwner && (
                <Button
                  className="h-8 w-auto rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-rose-700"
                  onClick={leaveFraudit}
                >
                  Leave Fraudit
                </Button>
              )}

              {isMember && isOwner && (
                <Button
                  className="h-8 w-auto rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-rose-700"
                  onClick={deleteFraudit}
                >
                  Delete
                </Button>
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
