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

interface Props {
  children: React.ReactNode;
}

export const CommentModal = ({ children }: Props) => {
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
            <Label className="text-base">Content:</Label>
            <Input
              type="text"
              className="w-full border outline-none focus:outline-none active:outline-none "
              placeholder="Nice Post!"
            />
            <Button>Post Now</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
