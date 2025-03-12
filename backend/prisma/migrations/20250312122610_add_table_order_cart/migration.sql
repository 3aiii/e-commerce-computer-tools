/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "OrderCart" (
    "orderId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "OrderCart_pkey" PRIMARY KEY ("orderId","cartId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_productId_key" ON "Cart"("productId");

-- AddForeignKey
ALTER TABLE "OrderCart" ADD CONSTRAINT "OrderCart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderCart" ADD CONSTRAINT "OrderCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
