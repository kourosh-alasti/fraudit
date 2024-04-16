"use client";

import { ChevronLeft, Menu, PlusIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import { SideDrawer } from "./side-drawer";
import { Input } from "./ui/input";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/store/use-sidebar";

export const AppBar = () => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const { open } = useSidebar();
  const router = useRouter();

  return (
    <nav className=" z-[999] mb-2 w-full border-b">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:justify-between  md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5  ">
          <ChevronLeft
            onClick={() => open()}
            className="hover:cursor-pointer"
          />
          <SideDrawer />
          <Link href="/app">
            {/* <h1 className="text-3xl font-bold text-purple-600">Fraudit</h1> */}
            <Image
              src="/logo.png"
              height="100"
              width="100"
              alt="Fraudit Logo"
              priority
            />
          </Link>
          <Input
            type="text"
            placeholder="Search"
            className="hidden w-96 rounded-md border-slate-500 bg-transparent px-2 py-2 text-gray-500 md:block"
          />
          <div className="md:hidden">
            <button
              className="focuse:border-gray-400 rounded-md p-2 text-gray-700 outline-none focus:border"
              onClick={() => setisMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <XIcon /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          className={`mt-8 w-full flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex w-full items-center justify-center md:flex-col md:space-x-6 md:space-y-0">
            <Input
              type="text"
              placeholder="Search"
              className="w-96 rounded-md border-slate-500 bg-transparent px-2 py-2 text-gray-500 md:hidden"
            />
            <div className="ml-2 flex items-center gap-x-1 md:ml-0 md:gap-4 md:self-end">
              <SignedOut>
                <SignInButton afterSignInUrl="/" afterSignUpUrl="/">
                  <Button>Sign In</Button>
                </SignInButton>
              </SignedOut>
              <div>
                <Button
                  className="px-1"
                  variant={"outline"}
                  onClick={() => router.push("/app/create/fraudit")}
                >
                  <PlusIcon className="h-4 w-4" />
                  Create Fraudit
                </Button>
              </div>

              <SignedIn>
                <li key="logout-user" className="block md:hidden">
                  <Button>Logout</Button>
                </li>
              </SignedIn>

              <div className="hidden md:block">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
