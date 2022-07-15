/*
  Warnings:

  - A unique constraint covering the columns `[postId,locale]` on the table `PostLocale` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostLocale_postId_locale_key" ON "PostLocale"("postId", "locale");
