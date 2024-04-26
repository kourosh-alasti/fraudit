"use client";

import { getUserThreads } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { threads } from "@/db/schema";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userThreads, setUserThreads] = useState<
    (typeof threads.$inferSelect)[]
  >([]);

  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const getData = () => {
      setLoading(true);

      getUserThreads()
        .then((res) => {
          setUserThreads(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    };

    getData();
  }, []);

  return (
    <div className="mx-auto flex h-full w-full flex-col rounded-md bg-white  p-4 sm:min-h-[65vh] sm:w-[70vw]">
      <div className="flex items-center justify-between px-6 py-6 sm:px-12 md:items-start">
        <ClerkLoaded>
          <Avatar className="h-20 w-20 md:h-40 md:w-40">
            <AvatarImage src={user.user?.imageUrl} />
            <AvatarFallback>
              {`${user.user?.firstName?.toUpperCase()} ${user.user?.lastName?.toUpperCase()}`}
            </AvatarFallback>
          </Avatar>
          <Card className="hidden sm:block">
            <CardHeader>
              <CardTitle className="text-end">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-end text-lg">
                {user.user?.firstName + " " + user.user?.lastName}
              </p>
              <div className="mt-4 flex justify-between gap-2">
                <Button onClick={() => router.push("/app/u/edit-profile")}>
                  Edit Profile
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>
                        <Trash2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Account?</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
          <Card className="ml-4 block sm:hidden">
            <CardHeader>
              <CardTitle className="text-center">{`u/${user.user?.username}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <p className="text-center text-sm md:text-lg lg:text-xl">
                  {user.user?.firstName + " " + user.user?.lastName}
                </p>
                <p className="text-center text-xs md:text-base lg:text-lg">
                  Since 2024
                </p>

                <Button onClick={() => router.push("/profile/edit")}>
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </ClerkLoaded>
        <ClerkLoading>
          <Avatar className="h-20 w-20 md:h-40 md:w-40">
            {/* <AvatarImage src={user.user?.imageUrl} /> */}
            <AvatarFallback className="animate-pulse">
              {/* {`${user.user?.firstName?.toUpperCase()} ${user.user?.lastName?.toUpperCase()}`} */}
            </AvatarFallback>
          </Avatar>
        </ClerkLoading>
      </div>
      <Separator className="my-8 mt-6 bg-slate-500" />
      {!loading && (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p>All Posts</p>
            <div className="flex gap-4 text-gray-300">
              <p className="flex hover:cursor-not-allowed">
                0 <ArrowUp />
              </p>
              <p className="flex hover:cursor-not-allowed">
                0 <ArrowDown />
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            {userThreads.map((thread) => (
              <div key={thread.id}>{thread.title}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
