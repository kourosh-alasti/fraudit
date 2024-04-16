export const CreateThreadCard = () => {
  return (
    <div className="flex h-20 w-full items-center justify-center gap-4 rounded-md bg-zinc-200 shadow-xl ">
      <div className="h-8 w-auto rounded-md bg-white px-2 py-1 hover:cursor-pointer hover:bg-gray-100">
        Create Post
      </div>
      <div className="h-8 w-auto rounded-md bg-rose-500 px-2 py-1 text-white hover:cursor-pointer hover:bg-rose-700">
        Leave Fraudit
      </div>
    </div>
  );
};
