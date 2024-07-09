-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'delivery');

-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('wating', 'withdrawn', 'delivered', 'returned');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'delivery',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "zipCode" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "complement" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "user_id" TEXT NOT NULL,
    "status" "StatusOrder" NOT NULL DEFAULT 'wating',
    "postedIn" TIMESTAMP(3) NOT NULL,
    "withdrawnIn" TIMESTAMP(3),
    "deliveredIn" TIMESTAMP(3),
    "returnedIn" TIMESTAMP(3),
    "user_order_id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_document_number_key" ON "users"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_order_id_fkey" FOREIGN KEY ("user_order_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
