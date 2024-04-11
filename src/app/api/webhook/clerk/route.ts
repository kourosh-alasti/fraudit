import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET! || ``;

export async function POST(req: Request) {
  const payloadString = await req.text();
  const headerPayload = req.headers;

  const fulfill = async ({
    headersArgs,
    payloadArgs,
  }: {
    headersArgs: any;
    payloadArgs: string;
  }) => {
    const wbh = new Webhook(webhookSecret);
    const payload = wbh.verify(payloadArgs, headersArgs) as WebhookEvent;

    return payload;
  };

  try {
    const res = await fulfill({
      payloadArgs: payloadString,
      headersArgs: {
        "svix-id": headerPayload.get("svix-id")!,
        "svix-timestamp": headerPayload.get("svix-timestamp")!,
        "svix-signature": headerPayload.get("svix-signature")!,
      },
    });

    switch (res.type) {
      case "user.created":
        await db.insert(users).values({
          id: res.data.id,
        });
        break;
      case "user.deleted":
        await db.delete(users).where(eq(users.id, res.data.id!));
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error(err);

    return new NextResponse("Webhook Error", {
      status: 400,
    });
  }
}
