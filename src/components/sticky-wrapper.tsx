interface Props {
  children: React.ReactNode;
}

export const StickyWrapper = ({ children }: Props) => {
  return (
    <div className="sticky bottom-6 hidden w-[368px] self-end lg:block">
      <div className="sticky top-32 flex min-h-[calc(100vh-152px)] flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};
