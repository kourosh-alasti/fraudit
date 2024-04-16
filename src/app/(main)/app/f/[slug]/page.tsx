import { FeedWrapper } from "@/components/feed-wrapper";
import { FrauditInfo } from "@/components/fraudit/fraudit-info";
import { ThreadItem } from "@/components/fraudit/thread-item";

import React from "react";

const FrauditPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const slugName = slug;

  return (
    <div className="flex flex-col gap-[48px] px-6 md:flex-row-reverse">
      <FrauditInfo slug={slug} />
      <FeedWrapper>
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
        <ThreadItem />
      </FeedWrapper>
    </div>
  );
};

export default FrauditPage;
