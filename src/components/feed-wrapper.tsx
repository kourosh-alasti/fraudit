interface Props {
  children: React.ReactNode;
}

export const FeedWrapper = ({ children }: Props) => {
  return (
    <div className="relative top-0 flex flex-1 flex-col gap-6 pb-10">
      {children}
    </div>
  );
};
