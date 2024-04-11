interface Props {
  children: React.ReactNode;
}

export const FeedWrapper = ({ children }: Props) => {
  return (
    <div className="flex-1 relative top-0 pb-10 flex flex-col gap-6">
      {children}
    </div>
  );
};
