/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Producto" ADD COLUMN     "codigo" TEXT NOT NULL,
ALTER COLUMN "codigoSistema" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigo_key" ON "public"."Producto"("codigo");
