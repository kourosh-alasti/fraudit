import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ThreadItem = () => {
  return (
    <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
      <div className="top-3 flex w-full items-center justify-between overflow-ellipsis whitespace-nowrap ">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <div className="flex gap-1">
          <p className="hidden md:block">u/kouroshalasti</p>
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>PA</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
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
