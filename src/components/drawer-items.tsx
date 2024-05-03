"use client";

import { getUserFraudits } from "@/actions/fraudit/get-user-fraudits";
import { fraudits } from "@/db/schema";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuItem } from "react-pro-sidebar";

export const DrawerItems = () => {
  const [userFraudits, setUserFraudits] = useState<
    (typeof fraudits.$inferSelect)[] | []
  >([]);

  useEffect(() => {
    const getData = () => {
      getUserFraudits()
        .then((data) => setUserFraudits(data))
        .catch((err) => console.error(err));
    };

    getData();
  }, []);

  return (
    <>
      {userFraudits.map((fraudit) => (
        <MenuItem
          key={fraudit.id}
          component={<Link href={`/app/f/${fraudit.slug}`} />}
        >{`f/${fraudit.slug}`}</MenuItem>
      ))}
    </>
  );
};
