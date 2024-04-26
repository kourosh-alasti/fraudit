"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { createComment } from "@/actions/comment/create-comment";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  threadId: string;
  frauditId: string;
}

export const CommentModal = ({ children, threadId, frauditId }: Props) => {
  const [val, setVal] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const postComment = () => {
    createComment({
      content: val,
      threadId,
      frauditId,
    })
      .then(() =>
        toast({
          title: "Success",
          description: "Successfully Commented",
          variant: "success",
        }),
      )
      .catch((err) =>
        toast({
          title: "An Error Occured",
          description: err.message || "Please try again later.",
          variant: "destructive",
        }),
      );

    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comment Now</DialogTitle>
          <DialogDescription>
            <p className="text-sm sm:text-base">
              Post your comment on this thread!
            </p>
          </DialogDescription>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full border outline-none focus:outline-none active:outline-none "
              placeholder="Nice Post!"
            />
            <Button onClick={postComment}>Post Now</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
