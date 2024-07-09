/*
  Warnings:

  - You are about to drop the column `deliveredOrderId` on the `delivery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_deliveredOrderId_fkey";

-- AlterTable
ALTER TABLE "delivery" DROP COLUMN "deliveredOrderId";
