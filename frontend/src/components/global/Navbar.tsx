"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import Image from "next/image";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/use-user-store";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const UINavbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();

  const MENU_ITEMS = [
    { title: "Home", path: "/" },
    { title: "Fraudits", path: "/fraudits" },
    { title: "Profile", path: "/profile" },
  ];

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
    <nav className="bg-white w-full border-b md:border-0 mb-4">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:justify-between md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            {/* <h1 className="text-3xl font-bold text-purple-600">Fraudit</h1> */}
            <Image
              src="/the_thing.png"
              height="100"
              width="100"
              alt="Fraudit Logo"
            />
          </Link>
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
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            isMobileMenu ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {MENU_ITEMS.map((item, index) => (
              <li key={index} className="text-gray-600 hover:text-indigo-600">
                {item.title === "Profile" ? (
                  <Link href={item.path}>
                    <p className="md:hidden block">{item.title}</p>
                    <Avatar className="h-14 w-14 hidden md:block">
                      <AvatarImage
                        src={
                          user
                            ? (user.profile_picture as string)
                            : "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>
                        {user
                          ? user.first_name[0].toUpperCase() +
                            user.last_name[0].toUpperCase()
                          : "TU"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                  <Link href={item.path}>{item.title}</Link>
                )}
              </li>
            ))}
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
