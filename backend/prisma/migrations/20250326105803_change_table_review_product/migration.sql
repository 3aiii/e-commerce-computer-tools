/*
  Warnings:

  - You are about to drop the column `userId` on the `ReviewProduct` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `ReviewProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReviewProduct" DROP CONSTRAINT "ReviewProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewProduct" DROP CONSTRAINT "ReviewProduct_userId_fkey";

-- AlterTable
ALTER TABLE "ReviewProduct" DROP COLUMN "userId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReviewProduct" ADD CONSTRAINT "ReviewProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewProduct" ADD CONSTRAINT "ReviewProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
