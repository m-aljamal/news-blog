/*
  Warnings:

  - Added the required column `NumberOfEmployees` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessStart` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faceBook` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsAppNumber` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "NumberOfEmployees" INTEGER NOT NULL,
ADD COLUMN     "businessStart" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "faceBook" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "jobDescription" TEXT NOT NULL,
ADD COLUMN     "logo" JSONB NOT NULL,
ADD COLUMN     "whatsAppNumber" TEXT NOT NULL,
ADD COLUMN     "youtube" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
