"use client";

import { searchProfessor } from "@/actions/rmp/search/search";
import { ProfessorsSearchList } from "@/components/rmp/professors-search-list";
import { SearchBar } from "@/components/rmp/search-bar";
import { professors } from "@/db/schema";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") as string;

  const [searchResults, setSearchResults] = useState<
    (typeof professors.$inferSelect)[]
  >([]);
  const [numSearchResults, setNumSearchResults] = useState<number>(0);

  useEffect(() => {
    const getData = () => {
      searchProfessor(query)
        .then((res) => {
          setSearchResults(res.professors);
          setNumSearchResults(res.length);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-5 md:gap-8">
      <SearchBar className="flex md:hidden" value={query} />

      <div>
        <div className="flex justify-between">
          <h1>{`Searching for ${query}`}</h1>
          <h1>{`${numSearchResults} Results`}</h1>
        </div>
        <ProfessorsSearchList professors={searchResults} />
      </div>
    </div>
  );
};

export default SearchPage;
