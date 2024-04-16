import { ThreadItem } from "./thread-item";

interface Props {
  slug: string;
}

export const PostInfo = ({ slug }: Props) => {
  return (
    <>
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
    </>
  );
};
