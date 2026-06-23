-- CreateTable
CREATE TABLE "public"."Proveedor" (
    "id" SERIAL NOT NULL,
    "codigoSistema" TEXT,
    "ruc" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "correo" TEXT,
    "contacto" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Compra" (
    "id" SERIAL NOT NULL,
    "codigoSistema" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "observacion" TEXT,
    "archivoAdjunto" TEXT,
    "subtotal" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "igv" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "proveedorId" INTEGER NOT NULL,
    "almacenId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DetalleCompra" (
    "id" SERIAL NOT NULL,
    "compraId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" DECIMAL(65,30) NOT NULL,
    "precioUnitario" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "DetalleCompra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_codigoSistema_key" ON "public"."Proveedor"("codigoSistema");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_ruc_key" ON "public"."Proveedor"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Compra_codigoSistema_key" ON "public"."Compra"("codigoSistema");

-- AddForeignKey
ALTER TABLE "public"."Compra" ADD CONSTRAINT "Compra_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "public"."Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Compra" ADD CONSTRAINT "Compra_almacenId_fkey" FOREIGN KEY ("almacenId") REFERENCES "public"."Almacen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetalleCompra" ADD CONSTRAINT "DetalleCompra_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "public"."Compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetalleCompra" ADD CONSTRAINT "DetalleCompra_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
