import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const texto =
      searchParams.get("texto") ?? "";

    const productos =
      await prisma.producto.findMany({
        where: {
          nombre: {
            contains: texto,
            mode: "insensitive",
          },

          estado: true,
        },

        take: 10,

        orderBy: {
          nombre: "asc",
        },
      });

    return NextResponse.json(
      productos
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Error al buscar productos",
      },
      {
        status: 500,
      }
    );
  }
}