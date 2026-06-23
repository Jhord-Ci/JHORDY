import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { id } = await params;

    const categoria = await prisma.categoria.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      },
    });

    return NextResponse.json(categoria);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al actualizar categoría",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const categoria = await prisma.categoria.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(categoria);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al eliminar categoría",
      },
      {
        status: 500,
      }
    );
  }
}