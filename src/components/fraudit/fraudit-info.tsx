"use client";

import { getFrauditBySlug } from "@/db/queries/fraudit";
import { fraudits } from "@/db/schema";
import { useEffect, useState } from "react";
import { StickyWrapper } from "@/components/sticky-wrapper";

interface Props {
  slug: string;
}

export const FrauditInfo = ({ slug }: Props) => {
  const [info, setInfo] = useState<typeof fraudits.$inferSelect | null>(null);

  useEffect(() => {
    const getData = () => {
      getFrauditBySlug(slug).then((data) => setInfo(data!));
    };
  }, [slug, info]);

  //   if (!info) {
  //     throw new Error("Fraudit does not exist");
  //   }

  return (
    <StickyWrapper>
      <div className=" flex h-40 w-auto flex-col justify-between rounded-md border px-4 py-2 shadow-lg">
        <div className="flex-col">
          <p className="text-lg">{info?.title}</p>
          <p className="text-sm text-muted-foreground">f/{info?.slug}</p>
        </div>
        <div className="flex justify-between">
          <p>{info?.memberCount} Members</p>
          <p>Since {info?.createdAt!.toLocaleDateString()}</p>
        </div>
      </div>
    </StickyWrapper>
  );
};
