-- CreateTable
CREATE TABLE "Ticket_tier" (
    "id" SERIAL NOT NULL,
    "service_fee" INTEGER NOT NULL,
    "buyer_price" INTEGER NOT NULL,
    "promoter_receives" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Platfrom_settings" (
    "id" SERIAL NOT NULL,
    "service_fee_rate" INTEGER NOT NULL,
    "minimum_fee" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_tier_id_key" ON "Ticket_tier"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Platfrom_settings_id_key" ON "Platfrom_settings"("id");
