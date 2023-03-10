/*
  Warnings:

  - You are about to drop the column `message` on the `applies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applies" DROP COLUMN "message",
ADD COLUMN     "which" TEXT,
ADD COLUMN     "why" TEXT;
