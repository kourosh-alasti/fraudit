import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const FeedWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "relative top-0 flex flex-1 flex-col gap-6 pb-10",
        className,
      )}
    >
      {children}
    </div>
  );
};
