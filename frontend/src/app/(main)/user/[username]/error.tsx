"use client";

import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-between container rounded mx-auto h-48 w-96 bg-slate-50 py-4">
      <h1 className="text-sm text-nowrap">
        Sorry, nobody on Fraudit goes by that username
      </h1>
      <Link
        href="/user"
        className="px-2 py-1 bg-blue-400 text-white text-center w-auto rounded-lg hover:bg-blue-700"
      >
        View your profile
      </Link>
    </div>
  );
}
