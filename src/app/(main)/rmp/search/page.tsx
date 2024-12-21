import { Suspense } from "react";
import SearchComponent from "./_component";

const SearchPage = () => {
  return (
      <Suspense>
          <SearchComponent />
    </Suspense>
  );
};

export default SearchPage;
