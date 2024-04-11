import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { getUserInfo } from "@/db/queries/user";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username;
  const userPromise = getUserInfo(username);

  const [user] = await Promise.all([userPromise]);

  return (
    <>
      <div className="mx-auto flex min-h-[65vh] w-[70vw] flex-col rounded-md bg-slate-100 p-4">
        <div className="flex justify-between px-6 py-6 sm:px-12">
          <Avatar className="h-20 w-20 md:h-40 md:w-40">
            <AvatarImage src={user?.clerk.imageUrl as string} />
            <AvatarFallback>
              {user
                ? user.clerk.firstName![0].toUpperCase() +
                  user.clerk.lastName![0].toUpperCase()
                : "TU"}
            </AvatarFallback>
          </Avatar>
          <Card className="hidden sm:block">
            <CardHeader>
              <CardTitle className="text-end">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-end text-lg">
                {user?.clerk.firstName + " " + user?.clerk.lastName}
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
                  {user?.clerk.firstName + " " + user?.clerk.lastName}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Separator className="my-8 mt-6 bg-slate-500" />
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p>All Posts</p>
            <div className="flex gap-4">
              <p className="flex">
                0 <ArrowUp />
              </p>
              <p className="flex">
                1000 <ArrowDown />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
