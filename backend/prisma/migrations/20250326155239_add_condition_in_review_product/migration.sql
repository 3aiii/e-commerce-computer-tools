-- CreateEnum
CREATE TYPE "condition" AS ENUM ('Waiting', 'Reviewed');

-- AlterTable
ALTER TABLE "ReviewProduct" ADD COLUMN     "condition" "condition" NOT NULL DEFAULT 'Waiting';
