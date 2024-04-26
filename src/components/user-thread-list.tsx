import { threads as threadsSchema } from "@/db/schema";
import { UserThreadItem } from "./user-thread-item";

interface Props {
  threads: (typeof threadsSchema.$inferSelect)[] | undefined;
}

export const UserThreadList = ({ threads }: Props) => {
  return (
    <div className="flex min-h-full w-full flex-col gap-3 px-2 py-1 md:gap-4">
      {!threads && <p>No Threads</p>}
      {threads &&
        threads.map((thread) => (
          <UserThreadItem
            key={thread.id}
            thread={thread}
            className="bg-zinc-200"
          />
        ))}
    </div>
  );
};
