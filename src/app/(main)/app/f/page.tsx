import { InfiniteScroller } from "@/components/infinite-scroller";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const FrauditsPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-y-hidden ">
      <ScrollArea className="flex h-full w-full items-center justify-center">
        <InfiniteScroller />
      </ScrollArea>
    </div>
  );
};

export default FrauditsPage;
