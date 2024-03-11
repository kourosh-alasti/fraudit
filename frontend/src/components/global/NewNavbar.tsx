"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useContext, useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { ChevronLeft, SearchIcon } from "lucide-react";
import NewSidebar from "./NewSidebar";
import { SidebarContext } from "@/providers/sidebar-provider";
import { Input } from "../ui/input";

export default function NewNavbar() {
  const [state, setState] = useState(false);
  const user = useUserStore((state) => state.user);
  const sidebarContext = useContext(SidebarContext);

  const { toggled, toggleSidebar } = sidebarContext;

  return (
    <div className="text-base lg:text-sm w-full border-b-slate-300 border ">
      <div
        className={` items-center gap-x-14 px-4 max-w-screen mx-auto lg:flex  lg:px-8 lg:static ${
          state ? "h-full fixed inset-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
          <div className="flex items-center">
            <ChevronLeft
              onClick={toggleSidebar}
              className="hover:cursor-pointer"
            />
            <NewSidebar />
            <Link href="/">
              <Image
                src="/the_thing.png"
                alt="Fraudit Logo"
                width={120}
                height={50}
              />
            </Link>
          </div>
          <div className="lg:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto absolute max-h-screen bg-red-200 lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${
            state ? "" : "hidden"
          }`}
        >
          <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0 ">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex-1 items-center self-center justify-start pb-4 lg:flex lg:pb-0 "
            >
              <div className="flex items-center gap-1 px-2">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg> */}
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-96 px-2 py-2 text-gray-500 bg-transparent rounded-md border-slate-500"
                />
              </div>
            </form>

            <Avatar className="h-14 w-14 hidden lg:block">
              <AvatarImage src={user?.profile_picture as string} />
              <AvatarFallback>
                {user
                  ? user.first_name[0].toUpperCase() +
                    user.last_name[0].toUpperCase()
                  : "TU"}
              </AvatarFallback>
            </Avatar>
          </ul>
        </div>
      </div>
    </div>
  );
}
