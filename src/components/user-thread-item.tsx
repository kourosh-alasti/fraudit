import { fraudits, threads } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFraudit } from "@/db/queries/fraudit";
import { UserThreadItemSkeleton } from "./skeletons/user-thread-item-skeleton";

interface Props {
  className?: string;
  thread: typeof threads.$inferSelect;
}

export const UserThreadItem = ({ thread, className }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [fraudit, setFraudit] = useState<typeof fraudits.$inferInsert>();

  const handleCardClick = () => {
    router.push(`/app/f/${fraudit!.slug}/${thread.id}`);
  };

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      getFraudit(thread.frauditId!)
        .then((res) => {
          setFraudit(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getData();
  }, [thread.frauditId]);

  return (
    <>
      {isLoading && <UserThreadItemSkeleton />}
      {!isLoading && fraudit && (
        <div
          className={cn(
            "flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md hover:cursor-pointer hover:border-[1.5px] hover:shadow-2xl",
            className,
          )}
          onClick={handleCardClick}
        >
          <div className="flex w-full items-center justify-between overflow-ellipsis whitespace-nowrap ">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap sm:whitespace-normal">
              {thread.title}
            </p>
            <div className="flex items-center gap-1 md:gap-4">
              <p className="text-sm md:text-base">{`f/${fraudit.slug}`}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-1 sm:flex-row md:gap-2">
            <p className="w-3/4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground sm:whitespace-normal">
              {thread.content}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
