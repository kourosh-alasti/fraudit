"use client";

import { getLimitedFraudits } from "@/db/queries/fraudit/get-limited-fraudits";
import { fraudits } from "@/db/schema";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

export const InfiniteScroller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<(typeof fraudits.$inferSelect)[] | null>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);

      getLimitedFraudits(0)
        .then((res) => setData(res))
        .catch((err) => console.log(err));

      setIsLoading(false);
    };

    getData();
  }, []);

  const fetchMore = () => {
    getLimitedFraudits(data?.length || 0).then((res) => {
      setData((prev) => {
        if (prev) {
          return [...prev, ...res];
        }

        return [...res];
      });
    });
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={fetchMore}
          loader={<Loader className="h-6 w-6 animate-spin" />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have reached the end of the fraudits</b>
            </p>
          }
          inverse={false}
          initialScrollY={0}
          pullDownToRefresh={false}
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              <b>&#8595; Pull down to refresh</b>
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              <b>&#8593; Release to refresh</b>
            </h3>
          }
        >
          {data.map((fraudit) => {
            const id = uuid();

            return (
              <div
                key={`${fraudit.id}-${id}`}
                className="mb-3 flex h-20 w-[250px] justify-between rounded-md border-2 border-slate-700 bg-white px-4 py-2 shadow-lg hover:cursor-pointer hover:shadow-2xl md:w-[500px] lg:w-[988px]"
                onClick={() => router.push(`/app/f/${fraudit.slug}`)}
              >
                <div className="w-1/2 overflow-ellipsis">
                  <h3 className="text-xl font-bold">{`f/${fraudit.slug}`}</h3>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                    {fraudit.descripton}
                  </p>
                </div>
                <div>
                  <h4>{`${fraudit.memberCount} Members`}</h4>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
};
