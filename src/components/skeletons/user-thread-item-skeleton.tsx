import { Skeleton } from "../ui/skeleton";

export const UserThreadItemSkeleton = () => {
  return (
    <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md hover:cursor-pointer hover:border-[1.5px] hover:shadow-2xl">
      <div className="flex w-full items-center justify-between text-ellipsis whitespace-nowrap ">
        <Skeleton className="h-4 w-24 overflow-hidden text-ellipsis whitespace-nowrap sm:whitespace-normal" />
        <div className="flex items-center gap-1 md:gap-4">
          <Skeleton className="h-4 w-12 text-sm md:text-base" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-1 sm:flex-row md:gap-2">
        <Skeleton className="h-4 w-3/4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground sm:whitespace-normal" />
      </div>
    </div>
  );
};
