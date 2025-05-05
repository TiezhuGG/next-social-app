import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!secret) return new Response("Missing secret", { status: 500 });

  const wh = new Webhook(secret);
  const body = await req.text();
  const headerPayload = await headers();

  const event = wh.verify(body, {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  }) as WebhookEvent;

  console.log("我登录了", event, body);

  if (event.type === "user.created") {
    try {
      const { id, username, image_url } = event.data;

      await prisma.user.create({
        data: {
          id: id,
          username: username,
          avatar: image_url,
          image_url: image_url,
          cover: "/noCover.png",
        },
      });

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Failed to create the user", { status: 500 });
    }
  }

  if (event.type === "user.updated") {
    const { id } = event.data;

    try {
      await prisma.user.update({
        where: { id: id },
        data: {
          id: id,
          username: JSON.parse(body).data.username,
          avatar: JSON.parse(body).data.image_url || "/noAvatar.png",
        },
      });
    } catch (error) {
      console.error(error);
      return new Response("Failed to update the user", { status: 500 });
    }
  }
}
