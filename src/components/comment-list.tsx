import { comments } from "@/db/schema";
import { CommentItem } from "./comment-item";

interface Props {
  comments: (typeof comments.$inferSelect)[];
}

export const CommentList = ({ comments }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      {comments.map((item) => (
        <CommentItem key={item.id} comment={item} />
      ))}
    </div>
  );
};
