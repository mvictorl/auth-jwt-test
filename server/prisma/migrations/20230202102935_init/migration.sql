/*
  Warnings:

  - A unique constraint covering the columns `[restoreLink]` on the table `NewPassword` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NewPassword_restoreLink_key" ON "NewPassword"("restoreLink");
