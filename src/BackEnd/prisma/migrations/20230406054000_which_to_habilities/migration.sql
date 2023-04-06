/*
  Warnings:

  - You are about to drop the column `which` on the `applies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applies" DROP COLUMN "which",
ADD COLUMN     "habilities" TEXT;
