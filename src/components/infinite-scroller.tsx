"use client";

import { getLimitedFraudits } from "@/db/queries/fraudit/get-limited-fraudits";
import { fraudits } from "@/db/schema";
import { ExternalLinkIcon, Loader, Loader2Icon } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { Button } from "./ui/button";
import Link from "next/link";

export const InfiniteScroller = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<(typeof fraudits.$inferSelect)[] | null>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const getData = useCallback(() => {
    getLimitedFraudits(0)
      .then((res) => {
        setData(res);
        setHasMore(res.length > 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchMore = useCallback(() => {
    if (!data || !hasMore) return;
    
    getLimitedFraudits(data.length)
      .then((res) => {
        setData((prev) => {
          if (prev) {
            return [...prev, ...res];
          }
          return [...res];
        });
        setHasMore(res.length > 0);
      })
      .catch((err) => console.log(err));
  }, [data, hasMore]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const currentObserver = observer.current;
    
    if (currentObserver) {
      currentObserver.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [fetchMore, hasMore]);

  return (
    <>
      {isLoading && (
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <Loader2Icon className="h-12 w-12 animate-spin" />
          <p className="text-base font-light tracking-tighter">
            Loading Sub-Fraudits
          </p>
        </div>
      )}
      {!isLoading && data && data.length > 0 && (
        <div className="flex h-full max-h-[calc(100vh-12rem)] w-full flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700 dark:hover:scrollbar-thumb-slate-600">
          {data.map((fraudit) => {
            const id = uuid();

            return (
              <Button
                key={`${fraudit.id}-${id}`}
                variant={"outline"}
                asChild
                className="flex h-20 w-full justify-between rounded-md border-slate-700 bg-white px-4 py-2 text-black shadow-lg"
              >
                <Link href={`/app/f/${fraudit.slug}`}>
                  <div className="flex-1 text-ellipsis text-black">
                    <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">{`f/${fraudit.slug}`}</h3>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                      {fraudit.descripton}
                    </p>
                  </div>
                  <div className="">
                    <h4>{`${fraudit.memberCount} Members`}</h4>
                  </div>
                </Link>
              </Button>
            );
          })}
          {hasMore && (
            <div ref={loadingRef} className="flex justify-center py-4">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          )}
          {!hasMore && data.length > 0 && (
            <p className="text-center py-4 text-muted-foreground">
              You have reached the end of the fraudits
            </p>
          )}
        </div>
      )}
      {!isLoading && data && data.length === 0 && (
        <div className="mt-14 flex flex-col items-center justify-center gap-6">
          <h1 className="text-lg font-semibold md:text-3xl">
            No Sub-Fraudits Found!
          </h1>
          <Button
            variant={"outline"}
            className="text-base font-light tracking-tighter md:text-lg"
            asChild
          >
            <Link href="/app/create/fraudit">Create a New One!</Link>
          </Button>
        </div>
      )}
    </>
  );
};
