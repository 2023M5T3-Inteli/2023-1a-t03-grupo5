/*
  Warnings:

  - You are about to drop the column `offerId` on the `applies` table. All the data in the column will be lost.
  - Added the required column `offerName` to the `applies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applies" DROP COLUMN "offerId",
ADD COLUMN     "offerName" TEXT NOT NULL;
