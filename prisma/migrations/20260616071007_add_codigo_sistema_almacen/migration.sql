/*
  Warnings:

  - A unique constraint covering the columns `[codigoSistema]` on the table `Almacen` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Almacen" ADD COLUMN     "codigoSistema" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Almacen_codigoSistema_key" ON "public"."Almacen"("codigoSistema");
