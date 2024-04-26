"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getThreadById } from "@/db/queries/thread";
import { getUser } from "@/db/queries/user";
import { threads, users, comments } from "@/db/schema";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { CommentModal } from "@/components/comment-modal";

const FrauditThreadPage = ({
  params: { threadId },
}: {
  params: { threadId: string };
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [thread, setThread] = useState<typeof threads.$inferSelect>();
  const [user, setUser] = useState<typeof users.$inferSelect>();
  const [threadComments, setThreadComments] = useState<
    (typeof comments.$inferSelect)[] | null
  >([]);

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);

      getThreadById(threadId)
        .then((res) => {
          setThreadComments(res.comments);
          setThread(res);

          getUser(res.user!.id)
            .then((resp) => setUser(resp))
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    };

    getData();
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* TODO: SKELETON */}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !thread && <div>Thread not found</div>}
      {!isLoading && thread && (
        <div className="flex min-h-[40%] w-full flex-col items-center justify-center gap-12  px-4 py-2 text-black">
          <div className="mx-auto flex w-full flex-col rounded-md border bg-gray-100 px-4 py-2 shadow-md lg:max-w-[988px]">
            <div className="mb-3 flex w-full items-center justify-between">
              <h1 className="text-lg md:text-xl lg:text-3xl">{thread.title}</h1>
              {/* TODO: USERNAME and AVATAR */}
              <p className="text-base tracking-tight">u/kouroshalasti</p>
            </div>
            <Separator className="hidden h-[1px] bg-slate-800 text-slate-800 md:block" />

            <div className=" mt-2 flex w-full items-center md:mt-4">
              <div className="markdown-body">
                <Markdown>{thread.content}</Markdown>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 px-2 md:flex-row-reverse md:gap-[48px]">
            <FeedWrapper className=" md:max-w-[250px]">
              <CommentModal threadId={thread.id} frauditId={thread.frauditId!}>
                <Button>Comment</Button>
              </CommentModal>
              <div className="flex w-full gap-4 ">
                <Button
                  aria-disabled="true"
                  disabled={true}
                  className="w-1/2 bg-green-500 disabled:bg-green-500/80"
                >
                  <ArrowUpIcon /> UpVote
                </Button>
                <Button
                  aria-disabled="true"
                  disabled={true}
                  className="w-1/2 bg-red-500"
                >
                  <ArrowDownIcon /> DownVote
                </Button>
              </div>
            </FeedWrapper>

            <div className="flex-1">
              <FeedWrapper>
                <div className="mx-auto flex w-full flex-col rounded-md border bg-gray-100 px-4 py-2 shadow-md lg:max-w-[988px] ">
                  <h1 className="mb-1 text-lg font-semibold md:text-xl lg:text-2xl xl:text-4xl">
                    Comments
                  </h1>

                  {(threadComments?.length === 0 ||
                    !threadComments?.length) && (
                    <h3 className="text-sm md:text-base lg:text-lg">
                      No-one has commented on this Thread. Be the first to
                      comment
                    </h3>
                  )}
                  {threadComments &&
                    threadComments?.length > 0 &&
                    threadComments?.map((item) => (
                      <div key={item.id}>{item.content}</div>
                    ))}
                </div>
              </FeedWrapper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FrauditThreadPage;
