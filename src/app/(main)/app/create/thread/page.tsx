import { Suspense } from "react";
import CreateThreadComponent from "./_component";

const CreateThreadPage = () => {
  return (
    <Suspense>
      <CreateThreadComponent />
    </Suspense>
  );
};

export default CreateThreadPage;
