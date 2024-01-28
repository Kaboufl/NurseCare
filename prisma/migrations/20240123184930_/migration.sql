/*
  Warnings:

  - Added the required column `mail` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Patient` ADD COLUMN `mail` VARCHAR(80) NOT NULL;
