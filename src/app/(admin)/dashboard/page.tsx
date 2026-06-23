"use client";

import { useEffect, useState } from "react";
import KpiCard from "@/components/dashboard/KpiCard";
import ChartPanel from "@/components/dashboard/ChartPanel";
import DataTable from "@/components/ui/DataTable";
import Skeleton from "@/components/ui/Skeleton";
import VentasPanel from "@/components/dashboard/VentasPanel";
import DoughnutPanel from "@/components/dashboard/DoughnutPanel";
import SucursalLinePanel from "@/components/dashboard/SucursalLinePanel";
import DateFilter from "@/components/ui/DateFilter";

export default function DashboardPage() {
  const [start, setStart] = useState<string | undefined>(undefined);
  const [end, setEnd] = useState<string | undefined>(undefined);
  const [compras, setCompras] = useState<any[]>([]);

  useEffect(() => {
    const qs = new URLSearchParams();
    if (start) qs.set('start', start);
    if (end) qs.set('end', end);

    fetch(`/api/compras?${qs.toString()}`)
      .then((r) => r.json())
      .then((json) => setCompras((json.recent ?? []).map((c: any) => ({ id: c.codigoSistema ?? c.id, proveedor: c.proveedor?.razonSocial ?? c.proveedorId, monto: `S/ ${Number(c.total ?? 0).toFixed(2)}`, estado: c.estado }))))
      .catch(console.error);
  }, [start, end]);

  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel Principal</h1>
          <p className="text-slate-500 mt-2">Resumen general de operaciones.</p>
        </div>

        <div className="flex items-center gap-6">
          <DateFilter start={start} end={end} onChange={(s, e) => { setStart(s); setEnd(e); }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard titulo="Ventas del Mes" valor="S/ 0.00" change="+0.0%" changeType="up" />
        <KpiCard titulo="Producción Hoy" valor="0 m³" change="+0%" changeType="up" />
        <KpiCard titulo="Alertas de Stock" valor="0" change="0%" changeType="down" />
        <KpiCard titulo="Compras Pendientes" valor="0" change="+0%" changeType="up" />

        <KpiCard titulo="Clientes" valor="0" change="+0%" changeType="up" />
        <KpiCard titulo="Proveedores" valor="0" change="+0%" changeType="up" />
        <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartPanel start={start} end={end} />
          <div>
            <VentasPanel start={start} end={end} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="font-semibold mb-4">Últimas Compras</h3>
          <DataTable
            columns={[
              { key: "id", label: "ID" },
              { key: "proveedor", label: "Proveedor" },
              { key: "monto", label: "Monto" },
              { key: "estado", label: "Estado" },
            ]}
            data={compras}
          />
        </div>

        <div className="lg:col-span-1 space-y-4">
          <DoughnutPanel start={start} end={end} />
          <SucursalLinePanel start={start} end={end} />
        </div>
        </div>
    </>
  );
}