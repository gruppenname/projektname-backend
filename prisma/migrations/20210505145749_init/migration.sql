-- CreateEnum
CREATE TYPE "Column" AS ENUM ('TODO', 'WIP', 'DONE');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "key" CHAR(12) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "column" "Column" NOT NULL DEFAULT E'TODO',

    PRIMARY KEY ("id")
);
