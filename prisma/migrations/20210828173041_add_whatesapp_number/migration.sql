/*
  Warnings:

  - You are about to drop the column `phone` on the `BusinessHelpRequest` table. All the data in the column will be lost.
  - Added the required column `whatsAppNumber` to the `BusinessHelpRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessHelpRequest" DROP COLUMN "phone",
ADD COLUMN     "whatsAppNumber" TEXT NOT NULL;
