import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // basic create passthrough - map fields that exist in DB
    const created = await prisma.compra.create({ data: body as any });

    return NextResponse.json({ mensaje: "Compra registrada", compra: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al registrar compra" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const start = url.searchParams.get("start");
    const end = url.searchParams.get("end");

    const where: any = {};
    if (start || end) {
      where.fecha = {};
      if (start) where.fecha.gte = new Date(start);
      if (end) where.fecha.lte = new Date(end);
    }

    // include relations and detalles.producto.categoria
    const compras = await prisma.compra.findMany({
      where,
      orderBy: { fecha: "asc" },
      take: 200,
      include: {
        proveedor: true,
        almacen: true,
        detalles: { include: { producto: { include: { categoria: true } } } },
      },
    });

    // aggregate per month
    const map = new Map<string, number>();

    compras.forEach((c) => {
      const d = new Date(c.fecha as unknown as string);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const val = Number((c.total ?? 0).toString());
      map.set(key, (map.get(key) ?? 0) + val);
    });

    const months = Array.from(map.keys()).sort();
    const monthly = months.map((m) => ({ month: m, total: map.get(m) ?? 0 }));

    const recent = compras.slice(-10).reverse();

    return NextResponse.json({ monthly, recent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error obteniendo compras" }, { status: 500 });
  }
}