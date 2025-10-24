/*
  Warnings:

  - You are about to drop the `PointsHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PointsHistory" DROP CONSTRAINT "PointsHistory_userId_fkey";

-- DropTable
DROP TABLE "public"."PointsHistory";

-- CreateTable
CREATE TABLE "points_history" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "PointHistoryType" NOT NULL DEFAULT 'DAILY',
    "description" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "points_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "points_history_userId_created_at_idx" ON "points_history"("userId", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "points_history" ADD CONSTRAINT "points_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
