-- AlterTable
ALTER TABLE "platfrom_settings" ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "platfrom_settings_id_seq";
