/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `points_history` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[telegramId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referralCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referralCode` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PurchaseCurrencyType" AS ENUM ('STARS', 'TON');

-- CreateEnum
CREATE TYPE "PurchaseType" AS ENUM ('TELEGRAM_STARS', 'TON_PAYMENT');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED', 'FAILED');

-- DropForeignKey
ALTER TABLE "public"."points_history" DROP CONSTRAINT "points_history_userId_fkey";

-- DropIndex
DROP INDEX "public"."users_email_key";

-- DropIndex
DROP INDEX "public"."users_id_created_at_idx";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "created_at",
DROP COLUMN "email",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dailyStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "firstName" VARCHAR(255),
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "languageCode" VARCHAR(10),
ADD COLUMN     "lastDailyClaimAt" TIMESTAMP(3),
ADD COLUMN     "lastName" VARCHAR(255),
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "paymentWalletAddress" VARCHAR(255),
ADD COLUMN     "paymentWalletVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentWalletVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "referralCode" VARCHAR(50) NOT NULL,
ADD COLUMN     "referralCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "referredBy" VARCHAR(128),
ADD COLUMN     "telegramId" VARCHAR(255) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "walletAddress" VARCHAR(255),
ADD COLUMN     "walletConnectedAt" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- DropTable
DROP TABLE "public"."points_history";

-- DropEnum
DROP TYPE "public"."PointHistoryType";

-- CreateTable
CREATE TABLE "purchases" (
    "id" VARCHAR(128) NOT NULL,
    "userId" VARCHAR(128) NOT NULL,
    "type" "PurchaseType" NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(20,9),
    "currency" "PurchaseCurrencyType",
    "telegramPaymentChargeId" VARCHAR(255),
    "invoicePayload" JSONB,
    "tonTransactionHash" VARCHAR(255),
    "tonFromAddress" VARCHAR(255),
    "tonAmount" DECIMAL(20,9),
    "tonVerifiedAt" TIMESTAMP(3),
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referrals" (
    "id" VARCHAR(128) NOT NULL,
    "referrerId" VARCHAR(128) NOT NULL,
    "referredId" VARCHAR(128) NOT NULL,
    "bonusAwarded" INTEGER NOT NULL DEFAULT 1000,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchases_telegramPaymentChargeId_key" ON "purchases"("telegramPaymentChargeId");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_tonTransactionHash_key" ON "purchases"("tonTransactionHash");

-- CreateIndex
CREATE INDEX "purchase_user_idx" ON "purchases"("userId");

-- CreateIndex
CREATE INDEX "purchase_status_idx" ON "purchases"("status");

-- CreateIndex
CREATE INDEX "purchase_type_idx" ON "purchases"("type");

-- CreateIndex
CREATE INDEX "purchase_telegram_payment_idx" ON "purchases"("telegramPaymentChargeId");

-- CreateIndex
CREATE INDEX "purchase_ton_hash_idx" ON "purchases"("tonTransactionHash");

-- CreateIndex
CREATE INDEX "purchase_ton_address_idx" ON "purchases"("tonFromAddress");

-- CreateIndex
CREATE INDEX "referral_referrer_idx" ON "referrals"("referrerId");

-- CreateIndex
CREATE INDEX "referral_referred_idx" ON "referrals"("referredId");

-- CreateIndex
CREATE UNIQUE INDEX "referrals_referrerId_referredId_key" ON "referrals"("referrerId", "referredId");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "users_referralCode_key" ON "users"("referralCode");

-- CreateIndex
CREATE INDEX "user_telegram_id_idx" ON "users"("telegramId");

-- CreateIndex
CREATE INDEX "user_referral_code_idx" ON "users"("referralCode");

-- CreateIndex
CREATE INDEX "user_leaderboard_idx" ON "users"("points" DESC, "createdAt" ASC);

-- CreateIndex
CREATE INDEX "user_payment_wallet_idx" ON "users"("paymentWalletAddress");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_referredBy_fkey" FOREIGN KEY ("referredBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
