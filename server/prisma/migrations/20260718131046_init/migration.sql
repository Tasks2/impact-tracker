/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_phone_key" ON "Beneficiary"("phone");
