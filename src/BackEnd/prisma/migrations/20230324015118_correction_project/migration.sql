/*
  Warnings:

  - You are about to drop the column `projectType` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `tasks` on the `projects` table. All the data in the column will be lost.
  - Added the required column `badge` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endSubscription` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roles` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Made the column `start` on table `projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end` on table `projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coleaderId` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_coleaderId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "projectType",
DROP COLUMN "tasks",
ADD COLUMN     "badge" TEXT NOT NULL,
ADD COLUMN     "endSubscription" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "roles" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL,
ALTER COLUMN "start" SET NOT NULL,
ALTER COLUMN "end" SET NOT NULL,
ALTER COLUMN "coleaderId" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pending',
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_coleaderId_fkey" FOREIGN KEY ("coleaderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
