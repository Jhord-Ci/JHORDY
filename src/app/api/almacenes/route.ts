import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function generarCodigoAlmacen() {
  const ultimoAlmacen = await prisma.almacen.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const siguienteNumero = (ultimoAlmacen?.id ?? 0) + 1;

  return `ALM-${String(siguienteNumero).padStart(6, "0")}`;
}

export async function GET() {
  try {
    const almacenes = await prisma.almacen.findMany({
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

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const codigoSistema =
      await generarCodigoAlmacen();

    const almacen = await prisma.almacen.create({
      data: {
        codigoSistema,

        codigo: codigoSistema,

        nombre: data.nombre,

        ubicacion: data.ubicacion,

        responsable: data.responsable,

        estado: true,
      },
    });

    return NextResponse.json(almacen);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al crear almacén",
      },
      {
        status: 500,
      }
    );
  }
}