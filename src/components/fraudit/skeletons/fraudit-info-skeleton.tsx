import { Skeleton } from "../../ui/skeleton";

export const FrauditInfoSkeleton = () => {
  return (
    <div className=" flex h-40 w-auto flex-col justify-between rounded-md border px-4 py-2 shadow-lg">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-5 w-[35%]" />
        <Skeleton className="h-5 w-[40%]" />
      </div>
    </div>
  );
};
