"use client";

import { Key, useEffect, useState } from "react";

import { User } from "@/utils/store.types";

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
    <div>
      {data.length < 1 && <p>No data</p>}
      {data.length > 0 &&
        data.map((user) => (
          <div key={user.first_name as Key}>
            <h1 className="text-red-700">{user.username}</h1>
          </div>
        ))}
    </div>
  );
};

export default Home;
