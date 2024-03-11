/*
  Warnings:

  - You are about to drop the `bonobservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoriesoin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
ALTER TABLE `intervention` DROP FOREIGN KEY `Intervention_patientId_fkey`;
DROP INDEX `Intervention_patientId_fkey` ON `intervention`;

-- DropIndex
ALTER TABLE `intervention` DROP FOREIGN KEY `Intervention_personnelId_fkey`;
DROP INDEX `Intervention_personnelId_fkey` ON `intervention`;

-- DropIndex
ALTER TABLE `personnel` DROP FOREIGN KEY `Personnel_etablissementId_fkey`;
DROP INDEX `Personnel_etablissementId_fkey` ON `personnel`;

-- DropIndex
ALTER TABLE `personnel` DROP FOREIGN KEY `Personnel_roleId_fkey`;
DROP INDEX `Personnel_roleId_fkey` ON `personnel`;

-- DropIndex
ALTER TABLE `prestation` DROP FOREIGN KEY `Prestation_interventionId_fkey`;
DROP INDEX `Prestation_interventionId_fkey` ON `prestation`;

-- DropIndex
ALTER TABLE `prestation` DROP FOREIGN KEY `Prestation_soinId_fkey`;
DROP INDEX `Prestation_soinId_fkey` ON `prestation`;

-- DropIndex
ALTER TABLE `soin` DROP FOREIGN KEY `Soin_categorieId_fkey`;
DROP INDEX `Soin_categorieId_fkey` ON `soin`;

-- DropTable
DROP TABLE `bonobservation`;

-- DropTable
DROP TABLE `categoriesoin`;

-- CreateTable
CREATE TABLE `categorie_soin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bon_observation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `note` VARCHAR(255) NOT NULL,
    `commentaire` VARCHAR(191) NOT NULL,
    `prestationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- RenameIndex
ALTER TABLE `personnel` RENAME INDEX `Personnel_mail_key` TO `personnel_mail_key`;
