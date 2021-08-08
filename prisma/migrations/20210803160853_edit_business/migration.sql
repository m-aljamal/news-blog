/*
  Warnings:

  - You are about to drop the column `industry` on the `Business` table. All the data in the column will be lost.
  - Added the required column `businessName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessType` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "industry",
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessType" TEXT NOT NULL;
