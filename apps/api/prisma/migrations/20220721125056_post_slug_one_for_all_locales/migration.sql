/*
  Warnings:

  - You are about to drop the column `slug` on the `PostLocale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PostLocale_slug_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostLocale" DROP COLUMN "slug";

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
