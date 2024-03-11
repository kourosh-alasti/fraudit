"use client";

import { Key, useEffect, useState } from "react";

import { User } from "@/utils/store.types";
import { AlertCircleIcon } from "lucide-react";

const Home = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/v1/user/", {
          method: "GET",
          mode: "cors",
          //   headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();

        setData(data.users);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-300 mt-10 container md:px-48 rounded flex flex-col mx-auto min-h-[65vh] min-w-[70%]">
      <div
        id="announcement"
        className="mx-auto flex items-center justify-center gap-3 self-center h-[10%] w-full bg-blue-900 text-white px-4 text-center py-6 mb-4 mt-4"
      >
        <AlertCircleIcon />
        <h1 className="sm:block hidden">Announcement v0.1.8 Released</h1>
        <h1 className="sm:hidden block">v0.1.8 </h1>
      </div>
      <div id="message" className="bg-transparent text-slate-800">
        <h2 id="title" className="text-xl mb-4 sm:block hidden">
          Fraudit Changelog - v0.1.8 - 03/10/2024
        </h2>
        <h2 id="title" className=" mb-4 sm:hidden block">
          Changelog - 03/10/2024
        </h2>
        <div id="changes" className="flex flex-col gap-6">
          <div id="frontendSection">
            <h4 className="text-lg font-semibold underline">UI Changes</h4>
            <ul className="list-disc ml-4">
              <li>Added Top Bar</li>
              <li>Added Side Navigation Drawer</li>
              <li>
                Added Auth Pages: [Login, Registration, Reset Password Request]
              </li>
              <li>Added Privacy Policy and User Agreements</li>
              <li>{"Removed Footer | moved policy links to Side Drawer "}</li>
            </ul>
          </div>
          <div id="backendSection">
            <h4 className="text-lg font-semibold underline">Under the Hood</h4>
            <ul className="list-disc ml-4">
              <li>Added sendEmail util to send emails to frauditters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
