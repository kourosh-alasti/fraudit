import { Skeleton } from "../ui/skeleton";

export const CommentItemSkeleton = () => {
  return (
    <div className="flex w-full justify-between rounded-md bg-white px-2 py-1">
      <Skeleton className="h-6 w-1/2" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-20 self-end" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  );
};
