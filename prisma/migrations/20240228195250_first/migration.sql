-- CreateTable
CREATE TABLE "Wine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cellar" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "reserve" TEXT NOT NULL,
    "barrel" TEXT NOT NULL,
    "varietal" TEXT[],
    "milliliters" INTEGER NOT NULL DEFAULT 750,
    "organic" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT NOT NULL,

    CONSTRAINT "Wine_pkey" PRIMARY KEY ("id")
);
