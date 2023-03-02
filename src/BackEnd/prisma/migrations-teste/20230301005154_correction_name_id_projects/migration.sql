/*
  Warnings:

  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `projects` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projects" (
    "projectId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tasks" TEXT NOT NULL,
    "start" DATETIME,
    "end" DATETIME,
    "coleaderId" TEXT,
    "ownerId" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "blockedSubscription" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "projects_coleaderId_fkey" FOREIGN KEY ("coleaderId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "projects_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_projects" ("blockedSubscription", "coleaderId", "createdAt", "end", "name", "ownerId", "projectType", "start", "tasks", "updatedAt") SELECT "blockedSubscription", "coleaderId", "createdAt", "end", "name", "ownerId", "projectType", "start", "tasks", "updatedAt" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
