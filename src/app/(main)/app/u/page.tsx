"use client";

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
import { useUser } from "@clerk/nextjs";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="mx-auto flex h-full w-full flex-col rounded-md bg-white  p-4 sm:min-h-[65vh] sm:w-[70vw]">
      <div className="flex items-center justify-between px-6 py-6 sm:px-12 md:items-start">
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
            <CardTitle className="text-center">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <p className="text-center">
                {user.user?.firstName + " " + user.user?.lastName}
              </p>
              <Button onClick={() => router.push("/profile/edit")}>
                Edit Profile
              </Button>
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
  );
};

export default ProfilePage;
