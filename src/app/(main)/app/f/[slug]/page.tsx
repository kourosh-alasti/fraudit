import { FeedWrapper } from "@/components/feed-wrapper";
import { CreateThreadCard } from "@/components/fraudit/create-thread-card";
import { FrauditInfo } from "@/components/fraudit/fraudit-info";
import { PostList } from "@/components/fraudit/post-list";
import { StickyWrapper } from "@/components/sticky-wrapper";

import React from "react";

const FrauditPage = ({ params: { slug } }: { params: { slug: string } }) => {
  return (
    <div className="flex flex-col gap-[48px] px-6 md:flex-row-reverse">
      <StickyWrapper>
        <FrauditInfo slug={slug} />
        <CreateThreadCard slug={slug} />
      </StickyWrapper>
      <FeedWrapper>
        <FrauditInfo slug={slug} className="w-full" />
        <PostList slug={slug} />
      </FeedWrapper>
    </div>
  );
};

export default FrauditPage;
