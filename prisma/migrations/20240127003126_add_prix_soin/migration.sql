/*
  Warnings:

  - Added the required column `prix` to the `Soin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Soin` ADD COLUMN `prix` DECIMAL(10, 2) NOT NULL;
