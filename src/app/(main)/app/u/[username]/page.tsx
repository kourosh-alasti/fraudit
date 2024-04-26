"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ArrowDown, ArrowUp, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { getUserByUsername } from "@/db/queries/user";
import { getThreadById } from "@/db/queries/thread";
import { getUserThreads } from "@/actions/user";
import { threads, users } from "@/db/schema";
import { UserThreadList } from "@/components/user-thread-list";
import { getUserInfo } from "@/actions/user/get-user-info";
import { getUserThreadsById } from "@/actions/user/get-user-threads-by-id";

const ProfilePage = ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [userThreads, setUserThreads] = useState<
    (typeof threads.$inferSelect)[]
  >([]);

  useEffect(() => {
    const getData = () => {
      setLoading(true);

      getUserInfo(username)
        .then((res) => {
          setUser(res);

          getUserThreadsById(res.clerk.id)
            .then((resp) => {
              setUserThreads(resp);
            })
            .catch((err) => {
              console.error(err);
            });

          setLoading(false);
        })
        .catch((err) => console.error(err));
    };

    getData();
  }, []);

  return (
    <>
      {/* TODO: SKELETON */}
      {loading && <Loader className="h-12 w-12 animate-spin" />}
      {!loading && user && (
        <div className="mx-auto flex h-full w-full flex-col rounded-md bg-white  p-4 sm:min-h-[65vh] sm:w-[70vw]">
          <div className="flex items-center justify-between px-6 py-6 sm:px-12 md:items-start">
            <Avatar className="h-20 w-20 md:h-40 md:w-40">
              <AvatarImage src={user?.clerk.imageUrl} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <Card className="ml-4 sm:ml-0">
              <CardHeader>
                <CardTitle className="text-center sm:text-end">{`u/${user.clerk.username}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-center text-sm md:text-lg lg:text-xl">
                    {user.clerk?.firstName + " " + user.clerk?.lastName}
                  </p>
                  <p className="text-center text-xs md:text-base lg:text-lg">
                    {`Since ${new Date(user.clerk?.createdAt!).getFullYear()}`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Separator className="my-8 mt-6 bg-slate-500" />
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
            <UserThreadList threads={userThreads} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
