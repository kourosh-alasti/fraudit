"use client";

import { getFrauditBySlug } from "@/db/queries/fraudit";
import { fraudits } from "@/db/schema";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { FrauditInfoSkeleton } from "./skeletons/fraudit-info-skeleton";
import { cn } from "@/lib/utils";
import { CreateThreadCard } from "./create-thread-card";

interface Props {
  slug: string;
  className?: string;
}

export const FrauditInfo = ({ slug, className }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState<typeof fraudits.$inferSelect | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = () => {
      getFrauditBySlug(slug).then((data) => setInfo(data!));

      setIsLoading(false);
    };

    getData();
  }, [slug]);

  return (
    <>
      {isLoading && <FrauditInfoSkeleton />}
      {!isLoading && (
        <div
          className={cn(
            "h-40 flex-col justify-between rounded-md py-2  ",
            className &&
              "sticky top-0 z-[10] flex w-[100vw] self-center border-b bg-white px-10 lg:hidden lg:px-3",
            !className && "flex w-auto border px-4 shadow-lg",
          )}
        >
          <div className="flex-col">
            <p className="text-lg">{info?.title}</p>
            <p className="text-sm text-muted-foreground">{`f/${info?.slug}`}</p>
          </div>
          <div className="flex justify-between">
            <p>{`${info?.memberCount} ${info?.memberCount === 1 ? "Member" : "Members"}`}</p>
            <p>{`Since ${info?.createdAt!.toLocaleDateString()}`}</p>
          </div>
        </div>
      )}
    </>
  );
};
