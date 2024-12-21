"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { threads } from "@/db/schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/actions/user/get-user-info";
import { getUserInfoById } from "@/actions/user/get-user-info-by-id";
import { Loader } from "lucide-react";
import { UserThreadItemSkeleton } from "../skeletons/user-thread-item-skeleton";

interface Props {
  className?: string;
  thread: typeof threads.$inferSelect;
}

export const ThreadItem = ({ thread, className }: Props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/app/f/psych/${thread.id}`);
  };

  useEffect(() => {
    const getData = () => {
      setLoading(true);

      getUserInfoById(thread.userId!)
        .then((res) => {
          setUser(res);

          setLoading(false);
        })
        .catch((err) => console.error(err));
    };

    getData();
  }, [thread.userId]);

  return (
    <>
      {loading && <UserThreadItemSkeleton />}
      {!loading && (
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
              <Link href={`/app/u/${user.clerk!.username}`}>
                <p className="hidden md:block">{`u/${user.clerk!.username}`}</p>
              </Link>
              <Link href={`/app/u/${user.clerk!.username}`}>
                <Avatar>
                  <AvatarImage src={user.clerk!.imageUrl} />
                </Avatar>
              </Link>
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
