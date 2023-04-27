/*
  Warnings:

  - You are about to drop the `Platfrom_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket_tier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Platfrom_settings";

-- DropTable
DROP TABLE "Ticket_tier";

-- CreateTable
CREATE TABLE "ticket_tier" (
    "id" SERIAL NOT NULL,
    "service_fee" INTEGER NOT NULL,
    "buyer_price" INTEGER NOT NULL,
    "promoter_receives" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "platfrom_settings" (
    "id" SERIAL NOT NULL,
    "service_fee_rate" INTEGER NOT NULL,
    "minimum_fee" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_tier_id_key" ON "ticket_tier"("id");

-- CreateIndex
CREATE UNIQUE INDEX "platfrom_settings_id_key" ON "platfrom_settings"("id");
