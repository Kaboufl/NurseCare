/*
  Warnings:

  - You are about to drop the column `date_paiement` on the `Intervention` table. All the data in the column will be lost.
  - Added the required column `date_integration` to the `Intervention` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Intervention` DROP COLUMN `date_paiement`,
    ADD COLUMN `date_integration` DATETIME(3) NOT NULL;
