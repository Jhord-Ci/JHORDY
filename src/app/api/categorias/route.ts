import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nombre: "asc",
      },
    });

    return NextResponse.json(categorias);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al obtener categorías",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const ultimaCategoria =
      await prisma.categoria.findFirst({
        orderBy: {
          id: "desc",
        },
      });

    const siguienteNumero =
      (ultimaCategoria?.id || 0) + 1;

    const codigo =
      `CAT-${String(siguienteNumero).padStart(6, "0")}`;

    const categoria = await prisma.categoria.create({
      data: {
        codigo,
        nombre: data.nombre,
        descripcion: data.descripcion || null,
        estado: true,
      },
    });

    return NextResponse.json(categoria);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al crear categoría",
      },
      {
        status: 500,
      }
    );
  }
}