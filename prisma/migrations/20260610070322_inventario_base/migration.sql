-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UnidadMedida" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnidadMedida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Producto" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoriaId" INTEGER NOT NULL,
    "unidadMedidaId" INTEGER NOT NULL,
    "stockActual" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "stockMinimo" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "costo" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "precioVenta" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "public"."Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "UnidadMedida_codigo_key" ON "public"."UnidadMedida"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigo_key" ON "public"."Producto"("codigo");

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Producto" ADD CONSTRAINT "Producto_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "public"."UnidadMedida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
