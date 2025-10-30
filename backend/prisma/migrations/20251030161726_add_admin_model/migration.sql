/*
  Warnings:

  - You are about to drop the column `bonusAwarded` on the `referrals` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `referredBy` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MODERATOR');

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_referredBy_fkey";

-- AlterTable
ALTER TABLE "referrals" DROP COLUMN "bonusAwarded",
ADD COLUMN     "codeUsed" TEXT,
ADD COLUMN     "pointsAmount" INTEGER NOT NULL DEFAULT 1000;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "level",
DROP COLUMN "referredBy",
ADD COLUMN     "referredById" VARCHAR(128),
ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "user_tasks" (
    "id" VARCHAR(128) NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "user_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" VARCHAR(128) NOT NULL,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "reward" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" VARCHAR(128) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" VARCHAR(128) NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "adminId" VARCHAR(128) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_task_user_idx" ON "user_tasks"("userId");

-- CreateIndex
CREATE INDEX "user_task_task_idx" ON "user_tasks"("taskId");

-- CreateIndex
CREATE INDEX "user_task_completed_idx" ON "user_tasks"("completed");

-- CreateIndex
CREATE UNIQUE INDEX "user_tasks_userId_taskId_key" ON "user_tasks"("userId", "taskId");

-- CreateIndex
CREATE INDEX "task_type_idx" ON "tasks"("type");

-- CreateIndex
CREATE INDEX "task_target_idx" ON "tasks"("target");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "admin_email_idx" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_token_admin_idx" ON "refresh_tokens"("adminId");

-- CreateIndex
CREATE INDEX "refresh_token_token_idx" ON "refresh_tokens"("token");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
