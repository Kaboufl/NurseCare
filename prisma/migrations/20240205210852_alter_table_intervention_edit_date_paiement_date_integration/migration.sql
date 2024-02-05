/*
  Warnings:

  - You are about to drop the column `date_paiement` on the `intervention` table. All the data in the column will be lost.
  - Added the required column `date_integration` to the `Intervention` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `BonObservation_prestationId_fkey` ON `bonobservation`;

-- DropIndex
DROP INDEX `CategorieSoin_parentId_fkey` ON `categoriesoin`;

-- DropIndex
DROP INDEX `Intervention_patientId_fkey` ON `intervention`;

-- DropIndex
DROP INDEX `Intervention_personnelId_fkey` ON `intervention`;

-- DropIndex
DROP INDEX `Personnel_etablissementId_fkey` ON `personnel`;

-- DropIndex
DROP INDEX `Personnel_roleId_fkey` ON `personnel`;

-- DropIndex
DROP INDEX `Prestation_interventionId_fkey` ON `prestation`;

-- DropIndex
DROP INDEX `Prestation_soinId_fkey` ON `prestation`;

-- DropIndex
DROP INDEX `Soin_categorieId_fkey` ON `soin`;

-- AlterTable
ALTER TABLE `intervention` DROP COLUMN `date_paiement`,
    ADD COLUMN `date_integration` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Personnel` ADD CONSTRAINT `Personnel_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personnel` ADD CONSTRAINT `Personnel_etablissementId_fkey` FOREIGN KEY (`etablissementId`) REFERENCES `Etablissement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `Personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_interventionId_fkey` FOREIGN KEY (`interventionId`) REFERENCES `Intervention`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_soinId_fkey` FOREIGN KEY (`soinId`) REFERENCES `Soin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategorieSoin` ADD CONSTRAINT `CategorieSoin_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `CategorieSoin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Soin` ADD CONSTRAINT `Soin_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `CategorieSoin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonObservation` ADD CONSTRAINT `BonObservation_prestationId_fkey` FOREIGN KEY (`prestationId`) REFERENCES `Prestation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
