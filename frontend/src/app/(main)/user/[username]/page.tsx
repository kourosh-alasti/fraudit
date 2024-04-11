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
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

async function getData(username: string) {
  const response = await fetch(
    `http://localhost:3333/api/v1/user/${username}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log("Error");
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username;
  const user = await getData(username);

  return (
    <div className="w-[70vw] min-h-[65vh] mx-auto rounded-md bg-slate-100 flex flex-col p-4">
      <div className="flex justify-between px-6 sm:px-12 py-6">
        <Avatar className="md:h-40 md:w-40 w-20 h-20">
          <AvatarImage src={user?.profile_picture as string} />
          <AvatarFallback>
            {user
              ? user.first_name[0].toUpperCase() +
                user.last_name[0].toUpperCase()
              : "TU"}
          </AvatarFallback>
        </Avatar>
        <Card className="sm:block hidden">
          <CardHeader>
            <CardTitle className="text-end">Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-end text-lg">
              {user?.first_name + " " + user?.last_name}
            </p>
          </CardContent>
        </Card>
        <Card className="sm:hidden block ml-4">
          <CardHeader>
            <CardTitle className="text-center">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <p className="text-center">
                {user?.first_name + " " + user?.last_name}
              </p>
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
