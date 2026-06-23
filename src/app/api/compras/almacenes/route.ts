import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const almacenes = await prisma.almacen.findMany({
      where: {
        estado: true,
      },
      orderBy: {
        nombre: "asc",
      },
    });

    return NextResponse.json(almacenes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al obtener almacenes",
      },
      {
        status: 500,
      }
    );
  }
}