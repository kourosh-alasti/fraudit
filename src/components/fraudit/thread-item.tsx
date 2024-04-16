import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export const ThreadItem = () => {
  return (
    <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
      <div className="flex w-full items-center justify-between overflow-ellipsis whitespace-nowrap ">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap sm:whitespace-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <div className="flex items-center gap-1 md:gap-4">
          <Link href="/">
            <p className="hidden md:block">u/kouroshalasti</p>
          </Link>
          <Link href="/">
            <Avatar>
              <AvatarImage></AvatarImage>
              <AvatarFallback>PA</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1 sm:flex-row md:gap-2">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground sm:whitespace-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
          placeat labore, illum omnis temporibus necessitatibus modi perferendis
          alias libero obcaecati delectus similique. Labore eum est iusto alias
          ab sunt! Quasi.
        </p>
        <p>Posted: 4hrs ago</p>
      </div>
    </div>
  );
};
