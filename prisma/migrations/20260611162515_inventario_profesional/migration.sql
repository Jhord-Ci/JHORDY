-- CreateTable
CREATE TABLE "public"."Almacen" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT,
    "responsable" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Almacen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StockAlmacen" (
    "id" SERIAL NOT NULL,
    "productoId" INTEGER NOT NULL,
    "almacenId" INTEGER NOT NULL,
    "stockActual" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "StockAlmacen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MovimientoInventario" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,
    "cantidad" DECIMAL(65,30) NOT NULL,
    "observacion" TEXT,
    "productoId" INTEGER NOT NULL,
    "almacenId" INTEGER NOT NULL,

    CONSTRAINT "MovimientoInventario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Almacen_codigo_key" ON "public"."Almacen"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "StockAlmacen_productoId_almacenId_key" ON "public"."StockAlmacen"("productoId", "almacenId");

-- AddForeignKey
ALTER TABLE "public"."StockAlmacen" ADD CONSTRAINT "StockAlmacen_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockAlmacen" ADD CONSTRAINT "StockAlmacen_almacenId_fkey" FOREIGN KEY ("almacenId") REFERENCES "public"."Almacen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovimientoInventario" ADD CONSTRAINT "MovimientoInventario_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovimientoInventario" ADD CONSTRAINT "MovimientoInventario_almacenId_fkey" FOREIGN KEY ("almacenId") REFERENCES "public"."Almacen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
