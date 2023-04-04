-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_coleaderId_fkey";

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "coleaderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_coleaderId_fkey" FOREIGN KEY ("coleaderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
