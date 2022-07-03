/*
  Warnings:

  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('code', 'life');

-- CreateEnum
CREATE TYPE "PostTag" AS ENUM ('typescript', 'bicycle');

-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'vi');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "category" "PostCategory" NOT NULL,
ADD COLUMN     "tags" "PostTag"[] DEFAULT ARRAY[]::"PostTag"[];

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "published",
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "PostLocale" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostLocale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostLocale_slug_key" ON "PostLocale"("slug");

-- AddForeignKey
ALTER TABLE "PostLocale" ADD CONSTRAINT "PostLocale_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
