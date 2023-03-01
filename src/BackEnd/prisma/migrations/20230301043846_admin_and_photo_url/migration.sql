-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "bornDate" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "n_dell" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "habilities" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "photoURL" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("bornDate", "createdAt", "email", "gender", "habilities", "id", "managerId", "n_dell", "name", "password", "updatedAt") SELECT "bornDate", "createdAt", "email", "gender", "habilities", "id", "managerId", "n_dell", "name", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
