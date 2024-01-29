/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `Personnel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Personnel_mail_key` ON `Personnel`(`mail`);
