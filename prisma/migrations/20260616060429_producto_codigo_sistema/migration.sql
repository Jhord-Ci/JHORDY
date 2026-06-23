/*
  Warnings:

  - You are about to drop the column `codigo` on the `Producto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigoSistema]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigoSistema` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Producto_codigo_key";

-- AlterTable
ALTER TABLE "public"."Producto" DROP COLUMN "codigo",
ADD COLUMN     "codigoSistema" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigoSistema_key" ON "public"."Producto"("codigoSistema");
