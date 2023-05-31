/*
  Warnings:

  - You are about to drop the `GamesTitles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GamesTitles";

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "gameName" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_titleId_key" ON "games"("titleId");
