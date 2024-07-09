/*
  Warnings:

  - Added the required column `vehicleName` to the `delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delivery" ADD COLUMN     "vehicleName" TEXT NOT NULL;
