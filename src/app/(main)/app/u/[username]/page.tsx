"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ArrowDown, ArrowUp, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { getUserByUsername, getUserInfo } from "@/db/queries/user";
import { getThreadById } from "@/db/queries/thread";
import { getUserThreads } from "@/actions/user";
import { users } from "@/db/schema";

const ProfilePage = ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const [user, setUser] = useState<typeof users.$inferSelect | null>();
  const [userThreads, setUserThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      setLoading(true);

      getUserByUsername(username)
        .then((res) => {
          setUser(res);
        })
        .catch((err) => console.error(err));

      // getUserInfo(username)
      //   .then((res) => {
      //     setUser(res);
      //   })
      //   .catch((err) => console.error(err));

      getUserThreads(user?.id)
        .then((res) => {
          setUserThreads(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          // setLoading(false);
        });
    };

    getData();
  }, []);

  return (
    <>
      {!loading && (
        <div className="mx-auto flex min-h-[65vh] w-[70vw] flex-col rounded-md bg-slate-100 p-4">
          <div className="flex justify-between px-6 py-6 sm:px-12">
            <Avatar className="h-20 w-20 md:h-40 md:w-40">
              {/* <AvatarImage src={user?.clerk.imageUrl as string} /> */}
              <AvatarFallback>
                {/* {user
                  ? user.clerk.firstName![0].toUpperCase() +
                    user.clerk.lastName![0].toUpperCase()
                  : "TU" */}
                TU
              </AvatarFallback>
            </Avatar>
            <Card className="hidden sm:block">
              <CardHeader>
                <CardTitle className="text-end">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-end text-lg">
                  {/* {user?.clerk.firstName + " " + user?.clerk.lastName} */}
                  Test User
                </p>
              </CardContent>
            </Card>
            <Card className="ml-4 block sm:hidden">
              <CardHeader>
                <CardTitle className="text-center">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-center">
                    {/* {user?.clerk.firstName + " " + user?.clerk.lastName} */}
                    test users
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
            <div className="flex flex-col">
              {userThreads.map((thread) => (
                <div key={thread.id}>{thread.title}</div>
              ))}
            </div>
          </div>
        </div>
      )}
      {loading && <Loader className="h-12 w-12 animate-spin" />}
    </>
  );
};

export default ProfilePage;
