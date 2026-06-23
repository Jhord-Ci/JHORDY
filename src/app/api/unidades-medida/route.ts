import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const unidades = await prisma.unidadMedida.findMany({
      orderBy: {
        nombre: "asc",
      },
    });

    return NextResponse.json(unidades);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al obtener unidades",
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

    const ultimaUnidad =
      await prisma.unidadMedida.findFirst({
        orderBy: {
          id: "desc",
        },
      });

    const siguienteNumero =
      (ultimaUnidad?.id || 0) + 1;

    const codigoSistema =
      `UNI-${String(siguienteNumero).padStart(6, "0")}`;

    const unidad = await prisma.unidadMedida.create({
      data: {
        codigoSistema,
        codigo: data.codigo,
        nombre: data.nombre,
        estado: true,
      },
    });

    return NextResponse.json(unidad);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al crear unidad",
      },
      {
        status: 500,
      }
    );
  }
}