/*
  Warnings:

  - Changed the type of `NumberOfEmployees` on the `Business` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "NumberOfEmployees",
ADD COLUMN     "NumberOfEmployees" INTEGER NOT NULL;
