"use client";

import { ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import Image from "next/image";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/use-user-store";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { SidebarContext } from "@/providers/sidebar-provider";
import NewSidebar from "./Sidebar";
import { Input } from "../ui/input";

const UINavbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();
  const sidebarContext = useContext(SidebarContext);
  const { toggled, toggleSidebar } = sidebarContext;

  const MENU_ITEMS = [{ title: "Profile", path: "/profile" }];

  const onLogout = async () => {
    try {
      const response = await fetch("http://localhost:3333/api/v1/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      });

      if (response.ok) {
        const data = await response.json();

        toast({
          variant: "destructive",
          title: "Logging Out",
          description: data.message,
        });

        logout();
        router.replace("/login");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There has been an error logging out, try again later",
      });
    }
  };

  return (
    <nav className=" w-full border-b mb-2">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:justify-between  md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 ">
          <ChevronLeft
            onClick={toggleSidebar}
            className="hover:cursor-pointer"
          />
          <NewSidebar />
          <Link href="/">
            {/* <h1 className="text-3xl font-bold text-purple-600">Fraudit</h1> */}
            <Image
              src="/the_thing.png"
              height="100"
              width="100"
              alt="Fraudit Logo"
            />
          </Link>
          <Input
            type="text"
            placeholder="Search"
            className="w-96 px-2 py-2 text-gray-500 bg-transparent hidden md:block rounded-md border-slate-500"
          />
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focuse:border-gray-400 focus:border"
              onClick={() => setIsMobileMenu(!isMobileMenu)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center w-full pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            isMobileMenu ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center w-full items-center space-y-8 flex flex-col md:space-x-6 md:space-y-0">
            <Input
              type="text"
              placeholder="Search"
              className="w-96 px-2 py-2 text-gray-500 bg-transparent md:hidden rounded-md border-slate-500"
            />
            <li key="user-avatar" className="text-gray-600 self-end ">
              <Link href="/user">
                <Avatar className="h-14 w-14 hidden md:block">
                  <AvatarImage src={user?.profile_picture as string} />
                  <AvatarFallback>
                    {`${user?.first_name[0].toUpperCase()}${user?.last_name[0].toUpperCase()}`}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </li>
            <li key="logout-user" className="md:hidden block">
              <Button onClick={onLogout}>Logout</Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UINavbar;
