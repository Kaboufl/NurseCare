-- DropForeignKey
ALTER TABLE `Prestation` DROP FOREIGN KEY `Prestation_interventionId_fkey`;

-- DropForeignKey
ALTER TABLE `Prestation` DROP FOREIGN KEY `Prestation_soinId_fkey`;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_interventionId_fkey` FOREIGN KEY (`interventionId`) REFERENCES `Intervention`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prestation` ADD CONSTRAINT `Prestation_soinId_fkey` FOREIGN KEY (`soinId`) REFERENCES `Soin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
