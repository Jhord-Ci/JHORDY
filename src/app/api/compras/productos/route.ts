import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        estado: true,
      },

      orderBy: {
        nombre: "asc",
      },
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al obtener productos",
      },
      {
        status: 500,
      }
    );
  }
}