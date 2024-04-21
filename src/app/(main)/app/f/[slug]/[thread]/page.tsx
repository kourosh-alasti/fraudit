"use client";

import { threads } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FrauditThreadPage = ({
  params: { threadId },
}: {
  params: { threadId: string };
}) => {
  const id = threadId;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [thread, setThread] = useState<typeof threads.$inferSelect>();

  useEffect(() => {
    setIsLoading(true);

    const getData = () => {};

    getData();
  }, [id]);

  useEffect(() => {}, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !thread && <div>Thread not found</div>}
      {!isLoading && thread && (
        <div className="flex min-h-[40%] w-full flex-col items-center justify-center bg-red-200 text-4xl text-black">
          <h1 className="">{thread.title}</h1>
        </div>
      )}
    </>
  );
};

export default FrauditThreadPage;
