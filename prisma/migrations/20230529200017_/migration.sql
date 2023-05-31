/*
  Warnings:

  - A unique constraint covering the columns `[gamertag]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "accounts_gamertag_key" ON "accounts"("gamertag");
