-- DropForeignKey
ALTER TABLE `CategorieSoin` DROP FOREIGN KEY `CategorieSoin_parentId_fkey`;

-- AlterTable
ALTER TABLE `CategorieSoin` MODIFY `parentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CategorieSoin` ADD CONSTRAINT `CategorieSoin_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `CategorieSoin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
