-- CreateTable
CREATE TABLE "projects" (
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tasks" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "coleaderId" TEXT,
    "ownerId" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "blockedSubscription" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "bornDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "n_dell" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "habilities" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "photoURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habilities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "habilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_coleaderId_fkey" FOREIGN KEY ("coleaderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
