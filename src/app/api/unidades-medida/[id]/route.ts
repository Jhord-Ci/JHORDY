import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { id } = await params;

    const unidad = await prisma.unidadMedida.update({
      where: {
        id: Number(id),
      },
      data: {
        codigo: data.codigo,
        nombre: data.nombre,
      },
    });

    return NextResponse.json(unidad);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar unidad" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { id } = await params;

    const unidad = await prisma.unidadMedida.update({
      where: {
        id: Number(id),
      },
      data: {
        estado: data.estado,
      },
    });

    return NextResponse.json(unidad);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al cambiar estado" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.unidadMedida.delete({
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
      { error: "Error al eliminar unidad" },
      { status: 500 }
    );
  }
}