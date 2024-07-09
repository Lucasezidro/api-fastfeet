/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('motocycle', 'car');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_order_id_fkey";

-- DropTable
DROP TABLE "Order";

-- CreateTable
CREATE TABLE "orders" (
    "user_id" TEXT NOT NULL,
    "status" "StatusOrder" NOT NULL DEFAULT 'wating',
    "postedIn" TIMESTAMP(3) NOT NULL,
    "withdrawnIn" TIMESTAMP(3),
    "deliveredIn" TIMESTAMP(3),
    "returnedIn" TIMESTAMP(3),
    "user_order_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "delivery" (
    "deliveryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL DEFAULT 'motocycle',
    "rating" INTEGER DEFAULT 0,
    "licensePlate" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "deliveredOrderId" TEXT NOT NULL,
    "deliveredUserId" TEXT NOT NULL,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("deliveryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_email_key" ON "delivery"("email");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_order_id_fkey" FOREIGN KEY ("user_order_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_deliveredOrderId_fkey" FOREIGN KEY ("deliveredOrderId") REFERENCES "orders"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_deliveredUserId_fkey" FOREIGN KEY ("deliveredUserId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
