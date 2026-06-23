/*
  Warnings:

  - A unique constraint covering the columns `[codigoSistema]` on the table `UnidadMedida` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."UnidadMedida" ADD COLUMN     "codigoSistema" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UnidadMedida_codigoSistema_key" ON "public"."UnidadMedida"("codigoSistema");
