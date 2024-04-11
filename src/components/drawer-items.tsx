"use client";

import { getUserFraudits } from "@/actions/fraudit/get-user-fraudits";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuItem } from "react-pro-sidebar";

export const DrawerItems = () => {
  const [fraudits, setFraudits] = useState<any[]>([]);

  useEffect(() => {
    const getData = () => {
      getUserFraudits().then((data) => setFraudits(data));
    };

    getData();
  }, []);

  return (
    <>
      {fraudits.map((fraudit) => (
        <MenuItem
          key={fraudit.id}
          component={<Link href={`/app/f/${fraudit.slug}`} />}
        >{`f/${fraudit.slug}`}</MenuItem>
      ))}
    </>
  );
};
