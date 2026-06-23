import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Try to read real ventas model if exists, otherwise return mock sample
    const clientAny = prisma as any;

    if (clientAny.venta) {
      const ventas = await clientAny.venta.findMany({ orderBy: { fecha: 'asc' }, take: 200 });

      const map = new Map();
      ventas.forEach((v: any) => {
        const d = new Date(v.fecha);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const val = Number((v.total ?? 0).toString());
        map.set(key, (map.get(key) ?? 0) + val);
      });

      const months = Array.from(map.keys()).sort();
      const monthly = months.map((m) => ({ month: m, total: map.get(m) ?? 0 }));

      return NextResponse.json({ monthly, recent: ventas.slice(-10), mock: false });
    }

    // mock data fallback
    const now = new Date();
    const monthly = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthly.push({ month: key, total: Math.round(Math.random() * 5000) });
    }

    const recent = [
      { id: 'V-001', cliente: 'Cliente A', total: 1200, estado: 'Completado' },
      { id: 'V-002', cliente: 'Cliente B', total: 3200, estado: 'Pendiente' },
    ];

    return NextResponse.json({ monthly, recent, mock: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error obteniendo ventas' }, { status: 500 });
  }
}
