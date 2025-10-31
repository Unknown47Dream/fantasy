-- CreateEnum
CREATE TYPE "XpType" AS ENUM ('MATCH_PARTICIPATION', 'MATCH_WIN', 'MATCH_LOSS', 'ACHIEVEMENT', 'DAILY_BONUS', 'TASK_COMPLETION', 'REFERRAL', 'PURCHASE_BONUS', 'ADMIN_ADJUSTMENT');

-- CreateTable
CREATE TABLE "xp_history" (
    "id" VARCHAR(128) NOT NULL,
    "userId" VARCHAR(128) NOT NULL,
    "type" "XpType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "xp_history_user_idx" ON "xp_history"("userId");

-- CreateIndex
CREATE INDEX "xp_history_type_idx" ON "xp_history"("type");

-- CreateIndex
CREATE INDEX "xp_history_created_at_idx" ON "xp_history"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "xp_history" ADD CONSTRAINT "xp_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
