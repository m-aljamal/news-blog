-- CreateTable
CREATE TABLE "BusinessHelpRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hasProcessed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
