/*
  Warnings:

  - You are about to drop the column `createAt` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the `FollowerRequest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Story` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `img` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FollowerRequest" DROP CONSTRAINT "FollowerRequest_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "FollowerRequest" DROP CONSTRAINT "FollowerRequest_senderId_fkey";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "img" TEXT NOT NULL;

-- DropTable
DROP TABLE "FollowerRequest";

-- CreateTable
CREATE TABLE "FollowRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "FollowRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowRequest_senderId_receiverId_key" ON "FollowRequest"("senderId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "Story_userId_key" ON "Story"("userId");

-- AddForeignKey
ALTER TABLE "FollowRequest" ADD CONSTRAINT "FollowRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowRequest" ADD CONSTRAINT "FollowRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
