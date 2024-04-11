import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

const FrauditPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const slugName = slug;

  return (
    <div className="flex flex-col gap-[48px] px-6 xl:flex-row-reverse">
      <StickyWrapper>
        <div className=" flex h-40 w-auto flex-col justify-between rounded-md border px-4 py-2 shadow-lg">
          <div className="flex-col">
            <p className="text-lg">CSUF Homework</p>
            <p className="text-sm text-muted-foreground">f/csufhomework</p>
          </div>
          <div className="flex justify-between">
            <p>126 Members</p>
            <p>Since 08/02/2023</p>
          </div>
        </div>
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
        <div className="flex h-auto max-h-[10rem] w-full flex-col justify-evenly gap-4 rounded-md border px-2 py-3 shadow-md">
          <div className="flex justify-between">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <div className="flex gap-1">
              <p>u/kouroshalasti</p>
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            placeat labore, illum omnis temporibus necessitatibus modi
            perferendis alias libero obcaecati delectus similique. Labore eum
            est iusto alias ab sunt! Quasi.
          </p>
          <p>Posted: 4hrs ago</p>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default FrauditPage;
