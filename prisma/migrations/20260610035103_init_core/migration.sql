-- CreateTable
CREATE TABLE "public"."Empresa" (
    "id" SERIAL NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "correo" TEXT,
    "logo" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sucursal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "rolId" INTEGER NOT NULL,
    "sucursalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Auditoria" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "accion" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_ruc_key" ON "public"."Empresa"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "public"."Rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Sucursal" ADD CONSTRAINT "Sucursal_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "public"."Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "public"."Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
