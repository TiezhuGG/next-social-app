import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import prisma from "@/lib/client";

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

  if (event.type === "user.created") {
    try {
      const { id, username, image_url } = event.data;

      await prisma.user.create({
        data: {
          id: id,
          username: username as string,
          avatar: image_url,
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
      const res = await prisma.user.update({
        where: { id: id },
        data: {
          username: JSON.parse(body).data.username || "FFF",
          avatar: JSON.parse(body).data.image_url || "/noAvatar.png",
        },
      });
    } catch (error) {
      console.error(error);
      return new Response("Failed to update the user", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
