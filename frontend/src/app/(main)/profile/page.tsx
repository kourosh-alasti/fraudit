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
import { ArrowDown, ArrowUp, Trash, Trash2 } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="w-[70vw] min-h-[65vh] rounded-md bg-blue-200 flex flex-col p-4">
      <div className="flex justify-between px-12 py-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
        <Card>
          <CardHeader>
            <CardTitle className="text-end">Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-end text-lg">Test User</p>
            <div className="flex justify-between gap-2 mt-4">
              <Button>Edit Profile</Button>
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
      </div>
      <Separator className="mt-6 my-8 bg-slate-500" />
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
