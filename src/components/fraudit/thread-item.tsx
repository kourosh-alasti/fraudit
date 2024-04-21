import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { threads } from "@/db/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  thread: typeof threads.$inferSelect;
}

export const ThreadItem = ({ thread }: Props) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/app/f/psych/${thread.id}`);
  };

  return (
    <div
      className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md hover:cursor-pointer hover:border-[1.5px] hover:shadow-2xl"
      onClick={handleCardClick}
    >
      <div className="flex w-full items-center justify-between overflow-ellipsis whitespace-nowrap ">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap sm:whitespace-normal">
          {thread.title}
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
      <div className="flex flex-col justify-between gap-1 sm:flex-row md:gap-2">
        <p className="w-3/4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground sm:whitespace-normal">
          {thread.content}
        </p>
      </div>
    </div>
  );
};
