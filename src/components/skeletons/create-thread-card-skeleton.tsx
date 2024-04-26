import { Skeleton } from "@/components/ui/skeleton";

export const CreateThreadCardSkeleton = () => {
  return (
    <div className=" flex h-20 w-full items-center justify-center gap-4 rounded-md border shadow-xl">
      <Skeleton className="h-8 w-1/3 rounded-md border px-2 py-1 hover:cursor-pointer hover:bg-gray-100" />
      <Skeleton className="h-8 w-1/3 rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-rose-700" />
    </div>
  );
};
