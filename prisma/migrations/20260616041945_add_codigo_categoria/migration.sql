/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Categoria" ADD COLUMN     "codigo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_codigo_key" ON "public"."Categoria"("codigo");
