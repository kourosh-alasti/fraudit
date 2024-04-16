import { FeedWrapper } from "@/components/feed-wrapper";
import { CreateThreadCard } from "@/components/fraudit/create-thread-card";
import { FrauditInfo } from "@/components/fraudit/fraudit-info";
import { PostInfo } from "@/components/fraudit/post-info";
import { StickyWrapper } from "@/components/sticky-wrapper";

import React from "react";

const FrauditPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const slugName = slug;

  return (
    <div className="flex flex-col gap-[48px] px-6 md:flex-row-reverse">
      <StickyWrapper>
        <FrauditInfo slug={slug} />
        <CreateThreadCard />
      </StickyWrapper>
      <FeedWrapper>
        <FrauditInfo slug={slug} className="w-full" />
        <PostInfo slug={slug} />
      </FeedWrapper>
    </div>
  );
};

export default FrauditPage;
