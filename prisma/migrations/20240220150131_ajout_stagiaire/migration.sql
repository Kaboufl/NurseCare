/*
  Warnings:

  - Added the required column `stagiaireId` to the `BonObservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BonObservation` ADD COLUMN `stagiaireId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BonObservation` ADD CONSTRAINT `BonObservation_stagiaireId_fkey` FOREIGN KEY (`stagiaireId`) REFERENCES `Personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
