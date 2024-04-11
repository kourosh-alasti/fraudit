"use client";

import Link from "next/link";

export default function UserErrorPage() {
  return (
    <div className="container mx-auto flex h-48 w-96 flex-col justify-between rounded bg-slate-50 py-4">
      <h1 className="text-nowrap text-sm">
        Sorry, nobody on Fraudit goes by that username
      </h1>
      <Link
        href="/app/user"
        className="w-auto rounded-lg bg-blue-400 px-3 py-1 text-center text-white hover:bg-blue-700"
      >
        View your profile
      </Link>
    </div>
  );
}
