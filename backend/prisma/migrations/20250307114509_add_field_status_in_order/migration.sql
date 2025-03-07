-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Processing', 'Shipped', 'Delivered');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';
