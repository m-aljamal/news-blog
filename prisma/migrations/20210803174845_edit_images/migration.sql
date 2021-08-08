/*
  Warnings:

  - The `images` column on the `Business` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "images",
ADD COLUMN     "images" JSONB[];
