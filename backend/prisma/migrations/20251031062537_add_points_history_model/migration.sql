-- CreateEnum
CREATE TYPE "PointsType" AS ENUM ('DAILY', 'REFERRAL', 'TASK_COMPLETION', 'PURCHASE', 'BONUS', 'ADMIN_ADJUSTMENT');

-- CreateTable
CREATE TABLE "points_history" (
    "id" VARCHAR(128) NOT NULL,
    "userId" VARCHAR(128) NOT NULL,
    "type" "PointsType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "points_history_user_idx" ON "points_history"("userId");

-- CreateIndex
CREATE INDEX "points_history_type_idx" ON "points_history"("type");

-- CreateIndex
CREATE INDEX "points_history_created_at_idx" ON "points_history"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "points_history" ADD CONSTRAINT "points_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
