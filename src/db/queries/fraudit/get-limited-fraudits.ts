import db from "@/db/drizzle";
import { fraudits, users } from "@/db/schema";

export const getLimitedFraudits = async (lastDoc: number) => {
  const data = await db.query.fraudits.findMany({
    orderBy: [fraudits.memberCount],
    with: {
      owner: {
        columns: {
          id: true,
        },
      },
    },
    limit: lastDoc,
  });

  if (!data) {
    throw new Error("Error fetching fraudits");
  }

  return data;
};
