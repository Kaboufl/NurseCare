-- DropIndex
DROP INDEX `bon_observation_prestationId_fkey` ON `bon_observation`;

-- DropIndex
DROP INDEX `categorie_soin_parentId_fkey` ON `categorie_soin`;

-- DropIndex
DROP INDEX `intervention_patientId_fkey` ON `intervention`;

-- DropIndex
DROP INDEX `intervention_personnelId_fkey` ON `intervention`;

-- DropIndex
DROP INDEX `personnel_etablissementId_fkey` ON `personnel`;

-- DropIndex
DROP INDEX `personnel_roleId_fkey` ON `personnel`;

-- DropIndex
DROP INDEX `Prestation_interventionId_fkey` ON `prestation`;

-- DropIndex
DROP INDEX `Prestation_soinId_fkey` ON `prestation`;

-- DropIndex
DROP INDEX `soin_categorieId_fkey` ON `soin`;

-- AlterTable
ALTER TABLE `intervention` MODIFY `date_facture` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `personnel` ADD CONSTRAINT `personnel_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personnel` ADD CONSTRAINT `personnel_etablissementId_fkey` FOREIGN KEY (`etablissementId`) REFERENCES `Etablissement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intervention` ADD CONSTRAINT `intervention_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intervention` ADD CONSTRAINT `intervention_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_interventionId_fkey` FOREIGN KEY (`interventionId`) REFERENCES `intervention`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_soinId_fkey` FOREIGN KEY (`soinId`) REFERENCES `soin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categorie_soin` ADD CONSTRAINT `categorie_soin_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `categorie_soin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `soin` ADD CONSTRAINT `soin_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `categorie_soin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bon_observation` ADD CONSTRAINT `bon_observation_prestationId_fkey` FOREIGN KEY (`prestationId`) REFERENCES `Prestation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
