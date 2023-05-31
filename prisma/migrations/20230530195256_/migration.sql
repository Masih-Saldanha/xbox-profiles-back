-- CreateTable
CREATE TABLE "GamesTitles" (
    "id" SERIAL NOT NULL,
    "gameName" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,

    CONSTRAINT "GamesTitles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GamesTitles_titleId_key" ON "GamesTitles"("titleId");
