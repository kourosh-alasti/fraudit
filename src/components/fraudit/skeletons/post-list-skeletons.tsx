import { Skeleton } from "@/components/ui/skeleton";

export const PostListSkeleton = () => {
  return (
    <>
      {[Array(12)].map((_, i) => (
        <div
          key={i}
          className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md"
        >
          <div className="flex h-auto w-full items-center justify-between">
            <Skeleton className="h-6 w-1/2 animate-pulse" />
            <div className="flex w-1/2 items-center justify-end gap-1 md:gap-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row md:mb-1 md:gap-2">
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      ))}
    </>
  );
};
