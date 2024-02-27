"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UINavbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const MENU_ITEMS = [
    { title: "Home", path: "/" },
    { title: "Fraudits", path: "/fraudits" },
    { title: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-white w-full border-b md:border-0 mb-4">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:justify-between md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-3xl font-bold text-purple-600">Fraudit</h1>
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
            {MENU_ITEMS.map((item, id) => (
              <li key={id} className="text-gray-600 hover:text-indigo-600">
                {item.title === "Profile" ? (
                  <Link href={item.path}>
                    <p className="md:hidden block">{item.title}</p>
                    <Avatar className="h-14 w-14 hidden md:block">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>TU</AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                  <Link href={item.path}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UINavbar;
