/*
  Warnings:

  - You are about to drop the column `created_at` on the `ticket_tier` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ticket_tier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ticket_tier" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "ticket_tier_id_seq";
