import AddPost from "@/components/AddPost";
import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import Stories from "@/components/Stories";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();
  
  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });
    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  return (
    <div className="flex gap-6 py-5">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile"></LeftMenu>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={user.cover || "/noCover.png"}
                fill
                className="object-cover rounded-xl"
                alt="cover"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                className="object-cover rounded-full absolute w-32 h-32 left-0 right-0 m-auto -bottom-16 ring-4 ring-white"
                width={128}
                height={128}
                alt="cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {user.name && user.surname
                ? `${user.name} ${user.surname}`
                : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">123</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">123.4k</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">133k</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
