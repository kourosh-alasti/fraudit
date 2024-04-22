import { InfiniteScroller } from "@/components/infinite-scroller";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const FrauditsPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <ScrollArea className="flex h-screen w-full ">
        <InfiniteScroller />
      </ScrollArea>
    </div>
  );
};

export default FrauditsPage;
