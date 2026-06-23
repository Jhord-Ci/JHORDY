import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function generarCodigoProducto() {
  const ultimoProducto = await prisma.producto.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const siguienteNumero =
    (ultimoProducto?.id ?? 0) + 1;

  return `PRO-${String(siguienteNumero).padStart(6, "0")}`;
}

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        categoria: true,
        unidadMedida: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const codigoSistema =
      await generarCodigoProducto();

    const producto =
      await prisma.producto.create({
        data: {
          codigoSistema,
          codigo: codigoSistema,

          nombre: data.nombre,
          descripcion: data.descripcion,

          categoriaId: Number(
            data.categoriaId
          ),

          unidadMedidaId: Number(
            data.unidadMedidaId
          ),

          stockActual: Number(
            data.stockActual ?? 0
          ),

          stockMinimo: Number(
            data.stockMinimo ?? 0
          ),

          costo: Number(
            data.costo ?? 0
          ),

          precioVenta: Number(
            data.precioVenta ?? 0
          ),

          estado: true,
        },
      });

    return NextResponse.json(producto);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const producto =
      await prisma.producto.update({
        where: {
          id: Number(data.id),
        },
        data: {
          nombre: data.nombre,
          descripcion: data.descripcion,

          categoriaId: Number(
            data.categoriaId
          ),

          unidadMedidaId: Number(
            data.unidadMedidaId
          ),

          stockActual: Number(
            data.stockActual ?? 0
          ),

          stockMinimo: Number(
            data.stockMinimo ?? 0
          ),

          costo: Number(
            data.costo ?? 0
          ),

          precioVenta: Number(
            data.precioVenta ?? 0
          ),
        },
      });

    return NextResponse.json(producto);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.producto.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar producto" },
      { status: 500 }
    );
  }
}