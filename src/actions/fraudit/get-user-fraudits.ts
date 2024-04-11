"use server";

import db from "@/db/drizzle";
import { fraudits, threads, userToFraudits, users } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { getFraudit } from "../../db/queries/fraudit";

export const getUserFraudits = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized Access");
  }

  try {
    const data = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        userToFraudits: {},
      },
    });

    if (!data) {
      throw new Error("User does not exist");
    }

    const frauditIds = data.userToFraudits.map((i) => i.frauditId);

    const fraudits: any[] = [];

    for (let i = 0; i < frauditIds.length; i++) {
      const data = await getFraudit(frauditIds[i]);

      fraudits.push(data);
    }

    return fraudits;
  } catch (err) {
    console.error(err);
    throw new Error("Could not fetch user fraudits, please try again later.");
  }
};
