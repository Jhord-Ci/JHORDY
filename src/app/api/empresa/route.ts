import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// OBTENER EMPRESA
export async function GET() {
  try {
    const empresa = await prisma.empresa.findFirst();

    return NextResponse.json(empresa);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener empresa" },
      { status: 500 }
    );
  }
}

// CREAR O ACTUALIZAR EMPRESA
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const empresaExistente = await prisma.empresa.findFirst();

    let empresa;

    if (empresaExistente) {
      empresa = await prisma.empresa.update({
        where: {
          id: empresaExistente.id,
        },
        data: {
          razonSocial: data.razonSocial,
          ruc: data.ruc,
          direccion: data.direccion,
          telefono: data.telefono,
          correo: data.correo,
        },
      });
    } else {
      empresa = await prisma.empresa.create({
        data: {
          razonSocial: data.razonSocial,
          ruc: data.ruc,
          direccion: data.direccion,
          telefono: data.telefono,
          correo: data.correo,
        },
      });
    }

    return NextResponse.json(empresa);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al guardar empresa",
      },
      {
        status: 500,
      }
    );
  }
}