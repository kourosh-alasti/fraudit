"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  className?: string;
  value?: string;
}

export const SearchBar = ({ className, value = "" }: Props) => {
  const [searchValue, setSearchValue] = useState(value);

  // TODO:
  // Issue on search page.

  return (
    <div className={cn(className)}>
      <Input
        type="text"
        placeholder="Find a Professor"
        value={value || searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-64 rounded-l-md rounded-r-none border-slate-500 bg-transparent px-3 py-2 text-gray-500 focus:outline-hidden active:outline-hidden"
      />
      <Link href={`/rmp/search?q=${encodeURIComponent(searchValue)}`}>
        <Button
          // disabled
          className="rounded-l-none hover:cursor-pointer hover:bg-gray-900 active:bg-gray-800"
        >
          Search
        </Button>
      </Link>
    </div>
  );
};
